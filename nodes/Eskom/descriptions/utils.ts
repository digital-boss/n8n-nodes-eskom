import { INodeProperties, INodePropertyOptions, NodeParameterValue } from "n8n-workflow";
import merge from "lodash.merge";

export const mapShowForOp = (op: string | string[]) => (i: INodeProperties): INodeProperties => merge({},
	i,
	showFor('operation', op)
);

export const showFor = (key: string, value: NodeParameterValue | NodeParameterValue[]): Partial<INodeProperties> => {
	const v = Array.isArray(value) ? value : [value];
	return {
		displayOptions: {
			show: {
				[key]: v,
			}
		},
	}
}

export const getOperationStub = (): INodeProperties => ({
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	default: '',
	options: []
})

export const makeOperationField = (options: INodePropertyOptions[], defaultValue: string = ''): INodeProperties => {
	return merge(
		getOperationStub(),
		{
			options,
			default: defaultValue
		}
	);
}

export const makeOptionalParams = (options: INodeProperties[]): INodeProperties => {
	return {
		displayName: 'Optional Params',
		name: 'optionalParams',
		type: 'collection',
		placeholder: 'Add Param',
		default: [],
		options,
	};
};
