import React, { useState } from 'react';
import { StyleSheet, Alert, Modal } from 'react-native';
import { Container, Header, Fab, Icon, Left, Body, Button, Title } from 'native-base';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';

App.defaultProps = {
  ...Constants.manifest.extra
}

export default function App({ URI }: { URI: string }) {
  const [modalVisible, setModalVisible] = useState(false);

  const INJECTED_JAVASCRIPT = `(function() {
    window.ReactNativeWebView.postMessage(JSON.stringify(window.location));
  })();`;

  return (
    <Container>
      <Header>
        <Body>
          <Title>KR Sample Webview</Title>
        </Body>
      </Header>
      <Fab
        direction="up"
        containerStyle={{ }}
        style={{ backgroundColor: '#5067FF' }}
        position="bottomRight"
        onPress={() => setModalVisible(true)}
      >
        <Icon name="md-chatbubbles" />
      </Fab>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
      }}>
        <Container>
          <Header>
            <Left>
              <Button
                rounded
                transparent
                iconLeft
                onPress={() => setModalVisible(false)}
              >
                <Icon name="arrow-back" />
              </Button>
            </Left>
          </Header>
          <WebView
            source={{ uri: URI }}
            // source={{ html: `
            // <script>
            //   document.addEventListener("DOMContentLoaded", function(event) { 
            //     //do work
            //     const newEl = document.createElement("p");
            //     document.body.appendChild(newEl);
            //     const element = document.getElementsByTagName("p");
            //     document.getElementsByTagName("p")[0].innerHTML = 'Hello World';
            //   });
            // </script>
            // `}}
            // injectedJavaScript={INJECTED_JAVASCRIPT}
          />
        </Container>
      </Modal>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
