import { INodePropertyOptions } from "n8n-workflow";

type ArrElement<ArrType> = ArrType extends readonly (infer ElementType)[]
  ? ElementType
  : never;

export const operationsConst = [
	{
		name: 'Status',
		value: 'status',
		description: 'The current and next loadshedding statuses for South Africa and (Optional) municipal overrides'
	},
	{
		name: 'Area Information',
		value: 'area',
		description: 'Obtain the id from Area Find or Area Search and use with this request. This single request has everything you need to monitor upcoming loadshedding events for the chosen suburb.'
	},
	{
		name: 'Areas Nearby (GPS)',
		value: 'areas_nearby',
		description: 'Find areas based on GPS coordinates (latitude and longitude). These are recommended areas based on EskomSePush users adding locations nearby to those coordinates. The first area returned is typically the best choice for the coordinates - as it\'s the most popular used.'
	},
	{
		name: 'Areas Search (Text)',
		value: 'areas_search',
		description: 'Search area based on text'
	},
	{
		name: 'Topics Nearby',
		value: 'topics_nearby',
		description: 'Find topics created by users based on GPS coordinates (latitude and longitude). Can use this to detect if there is a potential outage/problem nearby.'
	},
	{
		name: 'Check allowance',
		value: 'api_allowance',
		description: 'Check allowance allocated for token. NOTE: This call doesn\'t count towards your quota.'
	},
] as const

export const operationsList = operationsConst.map(i => i.value);

export type Operation = ArrElement<typeof operationsList>

export const operations = operationsConst as unknown as INodePropertyOptions[];

