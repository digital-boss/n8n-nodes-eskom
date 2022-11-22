import {
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IExecuteFunctions,
} from 'n8n-workflow';


import { version } from '../version';
import { ReturnParamsExecutor } from '@digital-boss/n8n-designpatterns/dist/usecases';
import { getNodeExecFn, StateBase } from '@digital-boss/n8n-designpatterns/dist';
import { IEskomApiCredentials } from 'credentials/EskomApi.credentials';
import { State } from './backend/State';
import { Executor } from './backend/Executor';
import { allProps } from './descriptions';

export class Eskom implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Eskom',
		name: 'eskom',
		icon: 'file:eskom.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: `Consume Eskom API (v.${version})`,
		defaults: {
				name: 'Eskom',
				color: '#00529e',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'eskomApi',
				required: true,
			},
		],
		properties: allProps,
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {

		// Build Executor
		const credsName = 'eskomApi';
		const creds = await this.getCredentials(credsName) as unknown as IEskomApiCredentials;
		const state = new State(this, creds);
		const executor = new Executor(this, state);
		const returnParamsExec = new ReturnParamsExecutor(new StateBase(this));

		const nodeExec = getNodeExecFn(executor.execute);
		return nodeExec.call(this);
	}
}

