import type { ConfigFile } from '@rtk-query/codegen-openapi'

const config: ConfigFile = {
	schemaFile: '../../apis/cms/calendar/calendar.yml',
	apiFile: '../src/features/booking/apis/booking.api.ts',
	apiImport: 'bookingApi',
	outputFile: '../src/features/booking/apis/booking.api-gen.ts',
	exportName: 'bookingGenApi',
	hooks: true,
	tag: true,
}

export default config