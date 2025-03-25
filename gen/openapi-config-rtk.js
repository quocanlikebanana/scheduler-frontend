/**
 * @type {import("@rtk-query/codegen-openapi").ConfigFile}
 */
const config = {
	schemaFile: '../../apis/cms/calendar/calendar.yml',
	apiFile: '../src/features/booking/apis/booking.api.ts',
	apiImport: 'bookingApi',
	outputFile: '../src/features/booking/apis/booking.api-gen.ts',
	exportName: 'bookingGenApi',
	hooks: true,
}

export default config;