import React from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import { Camera, Permissions } from "expo";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasCameraPermission: null, photoName: "", photoBase64: "" };
    this.camera = React.createRef();
  }
  snap = async () => {
    if (this.camera) {
      let photo = await this.camera.current.takePictureAsync({ base64: true });
      this.setState({ photoName: photo.uri, photoBase64: photo.base64 });
    }
  };
  componentDidMount() {
    console.warn("componentDidMount");
    this.askCameraPermission();
  }
  askCameraPermission = async () => {
    let { status } = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({ hasCameraPermission: status === "granted" });
  };

  render() {
    if (this.state.hasCameraPermission == null) {
      return <View />;
    } else if (this.state.hasCameraPermission == false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 4 }} ref={this.camera} />
          <View>
            <Button title="TakePhoto" onPress={this.snap} />
          </View>
          <View style={{ flex: 4 }}>
            <Image style={{ flex: 1 }} source={{ uri: this.state.photoName }} />
            <Image
              style={{ flex: 1 }}
              source={{
                uri: `data:image/gif;base64,${this.state.photoBase64}`
              }}
            />
          </View>
        </View>
      );
    }
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
