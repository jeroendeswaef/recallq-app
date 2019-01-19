import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import PouchDB from "pouchdb-react-native";

const localDB = new PouchDB("myDB");
const remoteDb = new PouchDB("[redacted]", {
	skipSetup: true,
	ajax: {
		cache: false,
		headers: {
			Cookie: "dd"
		}
	}
});
fetch("http://localhost:8080/get-cookie").then(() => {
	PouchDB.sync(localDB, remoteDb, { live: true, retry: true })
		.on("error", error => console.error("Sync Error", error))
		.on("change", info => console.log("Sync change", info))
		.on("paused", info => console.log("Sync paused", info));
});
export default class App extends React.Component {
	sync = async () => {
		console.info("Sync");
		const doc = {
			aa: "bb",
			date: new Date()
		};
		try {
			const result = await localDB.post(doc);
			console.log("save.attachment2", result);
			const info = await localDB.info();
			console.log("info", info);
		} catch (error) {
			console.warn("error", error, error.message, error.stack);
		}
	};

	render() {
		return (
			<View style={styles.container}>
				<Text>Test</Text>
				<Button title="aa" onPress={this.sync} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	}
});
