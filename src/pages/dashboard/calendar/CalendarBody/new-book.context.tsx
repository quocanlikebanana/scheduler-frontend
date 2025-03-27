import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { BoundaryConstraint } from '../../../../components/common/Popover';

interface NewBookContextProps {
	isPopoverOpen: boolean;
	setIsPopoverOpen: (isOpen: boolean) => void;
	anchorRect: DOMRect | undefined;
	boundaryConstraint: BoundaryConstraint;
	containerRef: React.RefObject<HTMLDivElement | null>;
	handleCellClick: (date: Date, element: HTMLElement) => void;
}

const NewBookContext = createContext<NewBookContextProps | undefined>(undefined);

export const NewBookProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
	const [isToCloseAppointmentCellClick, setIsToCloseAppointmentCellClick] = useState(false);
	const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
	const [boundaryConstraint, setBoundaryConstraint] = useState<BoundaryConstraint>(null);

	const containerRef = useRef<HTMLDivElement>(null);

	// Update boundary constraint when the container resizes or opens/closes
	useEffect(() => {
		if (containerRef.current) {
			const updateBoundary = () => {
				const rect = containerRef.current?.getBoundingClientRect();
				if (rect) {
					setBoundaryConstraint({
						top: rect.top,
						right: rect.right,
						bottom: rect.bottom,
						left: rect.left
					});
				}
			};

			// Initial calculation
			updateBoundary();

			const resizeObserver = new ResizeObserver(updateBoundary);
			resizeObserver.observe(containerRef.current);

			// Update on window resize
			window.addEventListener('resize', updateBoundary);
			return () => {
				if (containerRef.current) {
					resizeObserver.unobserve(containerRef.current);
				}
				window.removeEventListener('resize', updateBoundary);
				resizeObserver.disconnect();
			};
		}
	}, []);

	// Set the next cell click is to close the appointment popover
	useEffect(() => {
		if (isAppointmentOpen) {
			setIsToCloseAppointmentCellClick(true);
		}
	}, [isAppointmentOpen]);

	const handleCellClick = (date: Date, element: HTMLElement) => {
		setAnchorElement(element);
		if (isToCloseAppointmentCellClick) {
			setIsToCloseAppointmentCellClick(false);
		} else {
			setIsAppointmentOpen(true);
		}
	};

	return (
		<NewBookContext.Provider
			value={{
				containerRef,
				handleCellClick,
				isPopoverOpen: isAppointmentOpen,
				setIsPopoverOpen: setIsAppointmentOpen,
				boundaryConstraint,
				anchorRect: anchorElement?.getBoundingClientRect(),
			}}
		>
			{children}
		</NewBookContext.Provider>
	);
};

export const useNewBookContext = (): NewBookContextProps => {
	const context = useContext(NewBookContext);
	if (!context) {
		throw new Error('useAppointmentContext must be used within an AppointmentProvider');
	}
	return context;
};