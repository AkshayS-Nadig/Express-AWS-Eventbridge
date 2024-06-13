import {
	EventBridgeClient,
	PutEventsCommand,
} from "@aws-sdk/client-eventbridge";

const client = new EventBridgeClient({
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET,
	},
	region: process.env.AWS_REGION,
});

export const triggerEvent = async (eventDetail) => {
	const params = {
		Entries: [
			{
				Source: "EC2-EventBridge-Test",
				EventBusName: "default",
				Time: new Date(),
				DetailType: eventDetail["source"],
				Detail: JSON.stringify(eventDetail),
			},
		],
	};

	try {
		const command = new PutEventsCommand(params);
		const response = await client.send(command);

		return { success: true, response };
	} catch (error) {
		return { success: false, error: error.message };
	}
};
