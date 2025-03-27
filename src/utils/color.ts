export enum AppColorCode {
	Red = 0,
	Blue = 1,
	Green = 2,
	Yellow = 3,
	Orange = 4,
	Purple = 5,
	Pink = 6,
	Teal = 7,
	Indigo = 8,
	Cyan = 9,
	Gray = 10,
	Black = 11,
}

export class AppColor {
	static codeToColor(color: AppColorCode): string {
		switch (color) {
			case AppColorCode.Red:
				return 'bg-red-500';
			case AppColorCode.Blue:
				return 'bg-blue-500';
			case AppColorCode.Green:
				return 'bg-green-500';
			case AppColorCode.Yellow:
				return 'bg-yellow-500';
			case AppColorCode.Orange:
				return 'bg-orange-500';
			case AppColorCode.Purple:
				return 'bg-purple-500';
			case AppColorCode.Pink:
				return 'bg-pink-500';
			case AppColorCode.Teal:
				return 'bg-teal-500';
			case AppColorCode.Indigo:
				return 'bg-indigo-500';
			case AppColorCode.Cyan:
				return 'bg-cyan-500';
			case AppColorCode.Gray:
				return 'bg-gray-500';
			case AppColorCode.Black:
				return 'bg-black';
		}
	}

	static randomColor(): AppColorCode {
		const colorCode = Math.floor(Math.random() * 12);
		return colorCode;
	}
}