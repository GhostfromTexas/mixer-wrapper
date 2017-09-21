"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const config = require("../../config/config.json");
class TestButton extends index_1.InteractiveButton {
    constructor() {
        super(...arguments);
        this.counter = 0;
    }
    onMouseDown(event, participant, beamControl) {
        this.counter++;
        this.text = "-> " + this.counter;
    }
}
class ChangeSceneButton extends index_1.InteractiveButton {
    constructor(wrapper, id, text, group) {
        super(wrapper, id, text);
        this.group = group;
    }
    onMouseDown(event, participant, beamControl) {
        participant.move(this.group);
    }
}
const wrapper = new index_1.InteractiveWrapper(config.interactiveOauth.access, config.interactiveId);
// wrapper.enableLogging();
const newScene = new index_1.InteractiveScene(wrapper, "newScene", "newScene");
const newGroup = new index_1.InteractiveGroup(wrapper, newScene, "newScene");
let testButton = new index_1.InteractiveButton(wrapper, "testButton", "Test buttons!");
testButton.sparkCost = 1;
wrapper.defaultScene.addControl(testButton, [
    { size: "large", width: 80, height: 4, x: 0, y: 0 },
    { size: "medium", width: 11, height: 4, x: 0, y: 0 },
    { size: "small", width: 7, height: 4, x: 0, y: 0 }
]);
testButton.onMouseUpEvent.addCallback((event, participant) => {
    chatWrapper.sendChatMessage(participant.username + " clicked a button");
    testButton.setCooldown(30 * 1000); // 30 secounds
    testButton.sparkCost++;
    /*
    Charging sparks

    Example:
    wrapper.client.captureTransaction(event.transactionID).then(()=>{
        // do something
    });
    
    */
});
wrapper.defaultScene.addControl(new ChangeSceneButton(wrapper, "newSceneButton", "New Scene", newGroup), [
    { size: "large", width: 80, height: 4, x: 0, y: 4 },
    { size: "medium", width: 11, height: 4, x: 0, y: 4 },
    { size: "small", width: 7, height: 4, x: 0, y: 4 }
]);
wrapper.addScene(newScene);
wrapper.addGroup(newGroup);
newScene.addControl(testButton, [
    { size: "large", width: 80, height: 4, x: 0, y: 0 },
    { size: "medium", width: 11, height: 4, x: 0, y: 0 },
    { size: "small", width: 7, height: 4, x: 0, y: 0 }
]);
let testButton2 = new index_1.InteractiveButton(wrapper, "testButton2", "Test buttons2!");
testButton2.sparkCost = 1;
newScene.addControl(testButton2, [
    { size: "large", width: 80, height: 4, x: 0, y: 4 },
    { size: "medium", width: 11, height: 4, x: 0, y: 4 },
    { size: "small", width: 7, height: 4, x: 0, y: 4 }
]);
testButton2.onMouseUpEvent.addCallback(/*async */ (event, participant) => {
    chatWrapper.sendChatMessage(participant.username + " clicked a button");
    testButton2.setCooldown(10 * 1000); // 30 secounds
    testButton2.sparkCost++;
    /*await participant.move(wrapper.defaultGroup);
    await wrapper.removeGroup(newGroup);
    await wrapper.removeScene(newScene);
    await wrapper.addScene(newScene);
    await wrapper.addGroup(newGroup);*/
});
newScene.addControl(new ChangeSceneButton(wrapper, "backButton", "Back", wrapper.defaultGroup), [
    { size: "large", width: 80, height: 4, x: 0, y: 8 },
    { size: "medium", width: 11, height: 4, x: 0, y: 8 },
    { size: "small", width: 7, height: 4, x: 0, y: 8 }
]);
wrapper.onReady.addCallback(() => {
});
let chatWrapper = new index_1.ChatWrapper(config.channelId, config.botOauth.client_id, config.botOauth.access, config.botOauth.expires);
chatWrapper.onChatMessage.addCallback((msg) => {
    if (msg.text.toLowerCase() === "test") {
        chatWrapper.sendChatMessage("Yes we are testing");
    }
});
(() => __awaiter(this, void 0, void 0, function* () {
    yield wrapper.start();
    yield chatWrapper.start();
}))();
const carina = new index_1.CarinaWrapper();
carina.onFollowEvent.addCallback((data) => {
    console.log("onFollowEvent", data.user.username);
});
carina.onUnfollowEvent.addCallback((data) => {
    console.log("onUnfollowEvent", data.user.username);
});
carina.onResubscribeEvent.addCallback((data) => {
    console.log("onResubscribeEvent", data.user.username);
});
carina.onSubscribeEvent.addCallback((data) => {
    console.log("onSubscribeEvent", data.user.username);
});
carina.onSubscribeShareEvent.addCallback((data) => {
    console.log("onSubscribeShareEvent", data.user.username);
});
carina.onHostEvent.addCallback((data) => {
    console.log("onHostEvent", data.hoster.token);
});
(() => __awaiter(this, void 0, void 0, function* () {
    yield carina.start(config.channelId);
}))();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFpblRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zb3VyY2UvdGVzdHMvTWFpblRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLG9DQVlrQjtBQUVsQixNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsMEJBQTBCLENBQUMsQ0FBQztBQUVuRCxnQkFBaUIsU0FBUSx5QkFBaUI7SUFBMUM7O1FBQ0MsWUFBTyxHQUFXLENBQUMsQ0FBQztJQUtyQixDQUFDO0lBSkEsV0FBVyxDQUFDLEtBQWdDLEVBQUUsV0FBNEIsRUFBRSxXQUFvQjtRQUMvRixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ2xDLENBQUM7Q0FDRDtBQUVELHVCQUF3QixTQUFRLHlCQUFpQjtJQUdoRCxZQUFZLE9BQXVDLEVBQUUsRUFBVSxFQUFFLElBQVksRUFBRSxLQUF1QjtRQUNyRyxLQUFLLENBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBRUQsV0FBVyxDQUFDLEtBQWdDLEVBQUUsV0FBNEIsRUFBRSxXQUFvQjtRQUMvRixXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QixDQUFDO0NBQ0Q7QUFFRCxNQUFNLE9BQU8sR0FBRyxJQUFJLDBCQUFrQixDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQzdGLDJCQUEyQjtBQUUzQixNQUFNLFFBQVEsR0FBRyxJQUFJLHdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDdkUsTUFBTSxRQUFRLEdBQUcsSUFBSSx3QkFBZ0IsQ0FBQyxP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