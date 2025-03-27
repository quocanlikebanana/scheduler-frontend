export default function CurrentTimeIndicatorLayout({
	timeIndicator
}: {
	timeIndicator: {
		top: number;
		horizontalChunk: number;
	};
}) {
	return (
		<div
			className="absolute left-0 right-0 flex items-center"
			style={{
				top: timeIndicator.top - 1 // Minus to center the indicator
			}}
		>
			<div className="flex-1 grid grid-cols-7 h-px bg-gray-500">
				<div className="relative" style={{
					gridColumn: timeIndicator.horizontalChunk,
				}}>
					<div className="absolute h-[3px] bg-black w-full" style={{
						top: -1,
					}}>
						<div className="absolute" style={{
							top: -2,
							width: 2,
							height: 7,
							backgroundColor: 'black',
						}}></div>
					</div>
				</div>
			</div>
		</div>
	)
}
