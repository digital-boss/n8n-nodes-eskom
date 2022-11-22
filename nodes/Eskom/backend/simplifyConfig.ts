import { Operation } from '../descriptions/operations'

export const simplifyConfig: Partial<Record<Operation, string>> = {
	status: 'status',
	areas_nearby: 'areas',
	areas_search: 'areas',
	topics_nearby: 'topics',
	api_allowance: 'allowance'
};
