import { X, Clock, FileText } from 'lucide-react';
import React, { useCallback, useState } from 'react'
import { PostStoresByStoreIdBookApiArg, Service, useGetStoresByStoreIdServicesQuery, usePostStoresByStoreIdBookMutation } from '../../../../../features/booking/apis/booking.api-gen';
import { useAppSelector } from '../../../../../app/hooks';
import { selectors } from '../../../../../features/account/accountSlice';
import { AppColor } from '../../../../../utils/color';
import Dropdown, { Option } from '../../../../../components/common/Dropdown';
import TeamCard from '../../CalendarSide/TeamCard';

type Props = {
	onClose: () => void;
}

export default function NewBookForm({
	onClose,
}: Props) {
	const storeId = useAppSelector(selectors.getStoreIdStrict);
	const [selectedService, setSelectedService] = useState<Service | null>(null);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		let postData: PostStoresByStoreIdBookApiArg = {
			storeId,
			body: {
				teamId: '',
				start: new Date(formData.get('time') as string).toISOString(),
				end: new Date(formData.get('time') as string).toISOString(),
				serviceId: selectedService?.id ?? '',
				comment: formData.get('comment') as string,
				customer: "",
			}
		};
		await post(postData);
		onClose();
	};

	const { data: services } = useGetStoresByStoreIdServicesQuery({
		storeId
	});

	const [post, { }] = usePostStoresByStoreIdBookMutation();

	if (!services) return null;

	const getTeamCard = useCallback((): Option[] => {
		if (!selectedService) return [];
		return selectedService.members.map((member) => (
			{
				label: (
					<TeamCard
						key={member.id}
						id={member.id}
						name={member.name}
						avatar={member.avatar}
						role={member.role} />
				),
				value: member.id,
			}
		));
	}, [selectedService]);

	return (
		<form onSubmit={handleSubmit}>
			<div className="bg-white rounded-lg w-full"
				style={{
					boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
				}}>

				{/* Header */}
				<div className="flex justify-between items-center p-4 border-b">
					<h2 className="text-xl font-bold">Appointment</h2>
					<button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
						<X size={20} />
					</button>
				</div>

				{/* Form content */}
				<div className="p-4">

					{/* Service selector */}
					<div className="relative mb-4">
						<div
							className="flex items-center border rounded-lg p-3 cursor-pointer"
							onClick={() => setIsDropdownOpen(!isDropdownOpen)}
						>
							<div className="w-6 h-6 rounded-full bg-gray-300 mr-2"></div>
							<span className="text-gray-500 text-ellipsis">
								{selectedService
									? `${selectedService.name} - ${selectedService.duration} min`
									: 'Select a service'}
							</span>
						</div>

						{/* Dropdown */}
						{isDropdownOpen && (
							<div className="absolute left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-10">
								{services.map((service) => (
									<div
										key={service.id}
										className="flex items-center p-3 hover:bg-gray-50 cursor-pointer"
										onClick={() => {
											setSelectedService(service);
											setIsDropdownOpen(false);
										}}
									>
										<div className={`w-6 h-6 rounded-full ${AppColor.codeToColor(AppColor.randomColor())} mr-2`}></div>
										<div>
											<div className="font-medium text-sm text-gray-500">{service.duration} minutes</div>
										</div>
									</div>
								))}
							</div>
						)}
					</div>

					{/* Time selector */}
					<div className="flex items-center mb-4">
						<Clock className="text-gray-400 mr-2" size={20} />
						<input
							type="text"
							placeholder="Set time"
							className="border-b border-gray-300 w-full p-2 focus:outline-none"
						/>
					</div>

					<div className="flex items-center mb-4">
						<FileText className="text-gray-400 mr-2" size={20} />
						<input
							name='comment'
							type="text"
							placeholder="Notes to provider and guest(s)"
							className="border-b border-gray-300 w-full p-2 focus:outline-none"
						/>
					</div>

					{/* Provider */}
					<div className="flex items-center mb-6">
						<Dropdown options={getTeamCard()} onSelect={(value) => console.log(value)} />
					</div>

				</div>
			</div>

			{/* Footer */}
			<div className="flex justify-end p-4">
				<button
					type="submit"
					className="bg-black text-white px-6 py-2 rounded-full font-medium"
				>
					Create
				</button>
			</div>
		</form >
	);
}