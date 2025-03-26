export default function StoreIcon({
	color = "text-gray-500"
}: {
	color: string;
}) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2 ${color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
			<path strokeLinecap="round" strokeLinejoin="round" d="M3 10l1.664-5.328A2 2 0 016.58 3h10.84a2 2 0 011.916 1.672L21 10m-9 4v6m-4-6v6m8-6v6M5 10h14a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2z" />
		</svg>
	)
}
