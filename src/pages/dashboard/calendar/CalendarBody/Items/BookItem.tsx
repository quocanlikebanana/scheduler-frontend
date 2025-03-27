import { AppColor, AppColorCode } from '../../../../../utils/color';

type Props = {
	serviceName: string;
	color: AppColorCode;
}

export default function BookItem({
	serviceName,
	color,
}: Props) {
	const bgColor = AppColor.codeToColor(color);

	return (
		<div className={`${bgColor} w-full h-full rounded text-white text-center`}>
			{serviceName}
		</div>
	)
}