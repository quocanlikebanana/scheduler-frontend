import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export type Position = {
	x: number;
	y: number;
};

export type AnchorRect = {
	top: number;
	right: number;
	bottom: number;
	left: number;
	width: number;
	height: number;
};

// Added type for boundary constraint
export type BoundaryConstraint = {
	top?: number;
	right?: number;
	bottom?: number;
	left?: number;
} | null;

type PopoverPlacement = 'top' | 'right' | 'bottom' | 'left' | 'auto';

type PopoverProps = {
	isOpen: boolean;
	onClose: () => void;
	providedPosition?: Position;
	anchorRect?: AnchorRect;
	placement?: PopoverPlacement;
	children: React.ReactNode;
	width?: string | number;
	offset?: { x: number; y: number };
	animation?: 'none' | 'fade' | 'zoom' | 'slide';
	animationDuration?: number;
	boundaryConstraint?: BoundaryConstraint; // New prop for boundary constraint
};

export const Popover: React.FC<PopoverProps> = ({
	isOpen,
	onClose,
	providedPosition: position,
	anchorRect,
	placement = 'auto',
	children,
	width = 320,
	offset = { x: 0, y: 0 },
	animation = 'fade',
	animationDuration = 150,
	boundaryConstraint = null,
}) => {
	const popoverRef = useRef<HTMLDivElement>(null);
	const [adjustedPosition, setAdjustedPosition] = useState<Position>({ x: 0, y: 0 });
	const [isVisible, setIsVisible] = useState(false);
	const widthValue = typeof width === 'string' ? width : `${width}px`;

	// Handle animation visibility
	useEffect(() => {
		if (isOpen) {
			// Small delay to ensure DOM is updated before animation starts
			requestAnimationFrame(() => {
				setIsVisible(true);
			});
		} else {
			setIsVisible(false);
		}
	}, [isOpen]);

	// Calculate position based on position or anchorRect
	useEffect(() => {
		if (!isOpen) return;

		if (position) {
			// Use the direct position if provided
			setAdjustedPosition({
				x: position.x + offset.x,
				y: position.y + offset.y
			});
		}

		// Wait for component to render to get its dimensions
		requestAnimationFrame(() => {
			if (!popoverRef.current) return;

			const popoverRect = popoverRef.current.getBoundingClientRect();
			const viewportWidth = window.innerWidth;
			const viewportHeight = window.innerHeight;

			// Calculate position based on anchor if provided
			if (anchorRect) {
				const { top, right, bottom, left, width: anchorWidth, height: anchorHeight } = anchorRect;
				let x = 0;
				let y = 0;

				// Determine best placement if auto
				const effectivePlacement = placement === 'auto'
					? determineBestPlacement(anchorRect, viewportWidth, viewportHeight, boundaryConstraint)
					: placement;

				switch (effectivePlacement) {
					case 'top':
						x = left + (anchorWidth / 2) - (popoverRect.width / 2);
						y = top - popoverRect.height - offset.y;
						break;
					case 'right':
						x = right + offset.x;
						y = top + (anchorHeight / 2) - (popoverRect.height / 2);
						break;
					case 'bottom':
						x = left + (anchorWidth / 2) - (popoverRect.width / 2);
						y = bottom + offset.y;
						break;
					case 'left':
						x = left - popoverRect.width - offset.x;
						y = top + (anchorHeight / 2) - (popoverRect.height / 2);
						break;
				}

				// Apply the calculated position
				setAdjustedPosition({ x, y });
			}

			// Adjust to ensure within viewport boundaries and custom boundaries
			adjustToAllBoundaries(popoverRect, viewportWidth, viewportHeight, boundaryConstraint);
		});
	}, [isOpen, position, anchorRect, placement, offset, boundaryConstraint]);

	// Helper function to determine best placement
	const determineBestPlacement = (
		anchorRect: AnchorRect,
		viewportWidth: number,
		viewportHeight: number,
		boundaryConstraint: BoundaryConstraint
	): PopoverPlacement => {
		// Check space available on all sides
		const spaceTop = anchorRect.top;
		const spaceRight = viewportWidth - anchorRect.right;
		const spaceBottom = viewportHeight - anchorRect.bottom;
		const spaceLeft = anchorRect.left;

		// Adjust spaces based on boundary constraints
		const adjustedSpaces = {
			top: boundaryConstraint?.top !== undefined
				? Math.min(spaceTop, anchorRect.top - boundaryConstraint.top)
				: spaceTop,
			right: boundaryConstraint?.right !== undefined
				? Math.min(spaceRight, boundaryConstraint.right - anchorRect.right)
				: spaceRight,
			bottom: boundaryConstraint?.bottom !== undefined
				? Math.min(spaceBottom, boundaryConstraint.bottom - anchorRect.bottom)
				: spaceBottom,
			left: boundaryConstraint?.left !== undefined
				? Math.min(spaceLeft, anchorRect.left - boundaryConstraint.left)
				: spaceLeft
		};

		// Find the side with most space
		const spaces = [
			{ placement: 'bottom', space: adjustedSpaces.bottom },
			{ placement: 'right', space: adjustedSpaces.right },
			{ placement: 'top', space: adjustedSpaces.top },
			{ placement: 'left', space: adjustedSpaces.left },
		];

		// Sort by available space and get the best placement
		const bestPlacement = spaces
			.sort((a, b) => b.space - a.space)[0]
			.placement as PopoverPlacement;

		return bestPlacement;
	};

	// Adjust position to stay within viewport and custom boundaries
	const adjustToAllBoundaries = (
		popoverRect: DOMRect,
		viewportWidth: number,
		viewportHeight: number,
		boundaryConstraint: BoundaryConstraint
	) => {
		setAdjustedPosition(current => {
			let { x, y } = current;

			// Keep within horizontal viewport bounds
			if (x + popoverRect.width > viewportWidth) {
				x = Math.max(0, viewportWidth - popoverRect.width - 10);
			}
			if (x < 0) {
				x = 10; // Min 10px from edge
			}

			// Keep within vertical viewport bounds
			if (y + popoverRect.height > viewportHeight) {
				y = Math.max(0, viewportHeight - popoverRect.height - 10);
			}
			if (y < 0) {
				y = 10; // Min 10px from edge
			}

			// Apply custom boundary constraints if provided
			if (boundaryConstraint) {
				// Right boundary
				if (boundaryConstraint.right !== undefined && x + popoverRect.width > boundaryConstraint.right) {
					x = Math.max(0, boundaryConstraint.right - popoverRect.width - 10);
				}

				// Left boundary
				if (boundaryConstraint.left !== undefined && x < boundaryConstraint.left) {
					x = boundaryConstraint.left + 10;
				}

				// Bottom boundary
				if (boundaryConstraint.bottom !== undefined && y + popoverRect.height > boundaryConstraint.bottom) {
					y = Math.max(0, boundaryConstraint.bottom - popoverRect.height - 10);
				}

				// Top boundary
				if (boundaryConstraint.top !== undefined && y < boundaryConstraint.top) {
					y = boundaryConstraint.top + 10;
				}
			}

			return { x, y };
		});
	};

	// Close popover when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, onClose]);

	// Close on ESC key
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener('keydown', handleKeyDown);
		}

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [isOpen, onClose]);

	// Don't render anything if not open
	if (!isOpen) return null;

	// Place at the calculated position
	const popoverStyle: React.CSSProperties = {
		position: 'fixed',
		left: `${adjustedPosition.x}px`,
		top: `${adjustedPosition.y}px`,
		width: widthValue,
		zIndex: 1000,
		transition: `opacity ${animationDuration}ms ease, transform ${animationDuration}ms ease`,
		opacity: isVisible ? 1 : 0,
	};

	// Apply animation styles based on animation type
	const getAnimationStyles = (): React.CSSProperties => {
		if (!animation || animation === 'none') return {};

		switch (animation) {
			case 'fade':
				return {
					transform: isVisible ? 'translateY(0)' : 'translateY(8px)'
				};
			case 'zoom':
				return {
					transform: isVisible ? 'scale(1)' : 'scale(0.95)',
					transformOrigin: 'top'
				};
			case 'slide':
				return {
					transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
				};
			default:
				return {};
		}
	};

	return createPortal(
		<div
			ref={popoverRef}
			style={{ ...popoverStyle, ...getAnimationStyles() }}
			className="popover-container"
		>
			{children}
		</div>,
		document.body
	);
};