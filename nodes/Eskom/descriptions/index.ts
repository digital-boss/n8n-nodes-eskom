import merge from "lodash.merge";
import { INodeProperties, INodePropertyOptions } from "n8n-workflow";
import { simplifyConfig } from "../backend/simplifyConfig";
import { operations } from "./operations";
import * as utils from "./utils";

const areaParams: INodeProperties[] = [
	{
		name: 'id',
		displayName: 'ID',
		type: 'string',
		default: ''
	},
	utils.makeOptionalParams([{
		name: 'test',
		displayName: 'Test',
		description: 'For testing purposes only',
		type: 'options',
		default: 'current',
		options: [
			{
				name: 'current',
				value: 'current',
			},
			{
				name: 'future',
				value: 'future',
			}
		]
	}])
];

const latLonParams: INodeProperties[] = [
	{
		name: 'lat',
		displayName: 'Latitude',
		type: 'number',
		default: 0
	},
	{
		name: 'lon',
		displayName: 'Longitude',
		type: 'number',
		default: 0
	},
];

const areas_searchParams: INodeProperties[] = [
	{
		name: 'text',
		displayName: 'Text',
		type: 'string',
		default: '',
		description: 'String to search for'
	}
];

const simplifyProp: INodeProperties = {
	name: 'simplify',
	displayName: 'Simplify',
	type: 'boolean',
	default: true,
}

// const x = merge(simplifyProp, utils.showFor('operation', Object.keys(simplifyConfig)));
// console.log(JSON.stringify(x, null, 2));

export const allProps: INodeProperties[] = [
	utils.makeOperationField(operations, 'status'),
	...areaParams.map(utils.mapShowForOp('area')),
	...latLonParams.map(utils.mapShowForOp('areas_nearby')),
	...areas_searchParams.map(utils.mapShowForOp('areas_search')),
	...latLonParams.map(utils.mapShowForOp('topics_nearby')),
	merge(simplifyProp, utils.showFor('operation', Object.keys(simplifyConfig)))
];
