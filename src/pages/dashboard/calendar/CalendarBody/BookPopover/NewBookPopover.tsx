import { Popover } from '../../../../../components/common/Popover';
import { useNewBookContext } from '../new-book.context';
import NewBookForm from './NewBookForm';

export default function NewBookPopover() {
	const {
		isPopoverOpen,
		setIsPopoverOpen,
		anchorRect,
		boundaryConstraint
	} = useNewBookContext();

	const closePopover = () => {
		setIsPopoverOpen(false);
	};

	return (
		<Popover
			isOpen={isPopoverOpen}
			onClose={closePopover}
			anchorRect={anchorRect}
			placement="auto"
			width={400}
			offset={{ x: 10, y: 10 }}
			boundaryConstraint={boundaryConstraint}
			animation="fade"
		>
			<NewBookForm onClose={closePopover} />
		</Popover>
	);
};