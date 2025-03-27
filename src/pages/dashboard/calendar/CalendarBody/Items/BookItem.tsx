import { AppColor, AppColorCode } from '../../../../../utils/color';

type Props = {
	name: string;
	color: AppColorCode;
}

export default function BookItem({
	name,
	color,
}: Props) {
	const bgColor = AppColor.codeToColor(color);

	return (
		<div className={`${bgColor} w-full h-full rounded text-white text-center`}>
			{name}
		</div>
	)
}