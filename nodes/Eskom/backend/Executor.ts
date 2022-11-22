import { NodeExecutorBase } from "@digital-boss/n8n-designpatterns/dist";
import { IExecuteFunctions, IHttpRequestOptions } from "n8n-workflow";
import { simplifyConfig } from "./simplifyConfig";
import { State } from "./State";
import { Operation, operationsList } from '../descriptions/operations'

const formatHttpOpts = (opts: IHttpRequestOptions): any => {
	// workaround weird n8n bug: if returned object contains json: true, it returns only true value (no properties will returned).
	// so just rename json to jsonX
	const {json, ...logData} = opts;
	if (json !== undefined) {
		(logData as any).jsonX = json;
	}
	return logData;
}

export class Executor extends NodeExecutorBase<State> {

	constructor(
		public execFns: IExecuteFunctions,
		public state: State,
	) {
		super(state)
	}

	protected async executeCurrentItem(): Promise<any> {

		const op = this.execFns.getNodeParameter('operation', 0) as Operation;
		const httpReqOpts = this.state.buildRequest();
		const simplifyProp = simplifyConfig[op];

		if (this.state.creds.testingMode) {
			return Promise.resolve(formatHttpOpts(httpReqOpts));
		}

		return this.execFns.helpers.httpRequest.call(
			this.execFns,
			httpReqOpts,
		).then(this.state.simplify(simplifyProp));

		//return Promise.resolve(this.state.getAllParams());
	}

}
