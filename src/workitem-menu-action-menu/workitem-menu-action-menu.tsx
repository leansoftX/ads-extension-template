import "./workitem-menu-action-menu.scss"

///<reference types="vss-web-extension-sdk" />
import "es6-promise/auto";
import * as SDK from "azure-devops-extension-sdk";
import { CommonServiceIds, IHostPageLayoutService, PanelSize } from "azure-devops-extension-api";

SDK.register("batch-copy-workitem-work-item-menu.action", () => {
    return {
        execute: async () => {
            alert("sdk menu action click");
            const dialogSvc = await SDK.getService<IHostPageLayoutService>(CommonServiceIds.HostPageLayoutService);
            //dialogSvc.openMessageDialog(`batch-copy-workitem-work-item-menu.action`, { showCancel: true });
            // dialogSvc.openCustomDialog<boolean | undefined>(
            //     SDK.getExtensionContext().id + ".batch-copyworkitems-dialog", {
            //     title: "Batch Copy Workitems",
            //     configuration: {
            //         message: "Use compact pivots?",
            //         initialValue: false
            //     },
            //     onClose: (result) => {
            //         alert("closed.");
            //         if (result !== undefined) {
            //             //this.setState({ useCompactPivots: result });.bolt-callout-medium

            //         }
            //     },

            // });
            // dialogSvc.openPanel<boolean | undefined>(
            //     SDK.getExtensionContext().id + ".batch-copyworkitems-dialog", {
            //     title: "Batch Copy Workitems",
            //     configuration: {
            //         message: "Use compact pivots?",
            //         initialValue: {}
            //     },
            //     onClose: (result) => {
            //         alert("closed.");
            //         if (result !== undefined) {
            //             //this.setState({ useCompactPivots: result });.bolt-callout-medium

            //         }
            //     },
            //     size: PanelSize.Large,
            // });
         }
    }
});

SDK.init();


//const extensionContext = VSS.getExtensionContext();
VSS.register(`batch-copy-workitem-work-item-menu.action`, {
    execute: menuAction
});

export async function menuAction(actionContext: any) {
    alert("vss menu action click");
    let workItemIds: number[] = [];
    // if (actionContext.workItemIds === undefined) {
    //     workItemIds.push(actionContext.id);
    // }
    // else {
    //     workItemIds = actionContext.workItemIds;
    // }
    let IworkItemInfos: number[] = [];
    if (workItemIds && workItemIds.length > 0) {
        
        for (let workItem in workItemIds) {
            IworkItemInfos.push(workItemIds[workItem])
        }        
    }

    let hostDialogService: IHostDialogService = await VSS.getService(VSS.ServiceIds.Dialog);
    let diagResult = await hostDialogService.openDialog( SDK.getExtensionContext().id + ".batch-copyworkitems-dialog",
        {
            title: "Batch Copy",
            width: window.screen.availWidth - 450,
            height: window.screen.availHeight - 350,
            modal: true,
            resizable: true,
            //buttons: null
            open: (data:any)=>{ alert("opened"); },
            close: (data:any) => {
                alert("closed.");
                if (data !== undefined) {
                    //this.setState({ useCompactPivots: result });.bolt-callout-medium

                }
            },
            okCallback: (data:any)=>{ alert("ok callback"); },
            cancelCallback:(r:any) => { alert("cancel callback"); },
            okText:"确定",cancelText:"取消"
        },
        //<IDialogInputData>
        {
            workItemIds: IworkItemInfos
        }
    );
    //diagResult.close
}

VSS.init({
    // explicitNotifyLoaded: true,
    // usePlatformScripts: true
});

// Load main entry point for extension
// VSS.require([], function () {
//     // Loading succeeded
//     VSS.notifyLoadSucceeded();
// });
//VSS.notifyLoadSucceeded();


