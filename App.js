import React, {useState} from 'react';
import {Button, Root, ActionSheet, Text} from 'native-base';
import {View, StyleSheet, Image} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  return (
    <Root>
      <View style={styles.screen}>
        <View>
          <Button
            success
            onPress={() => {
              ActionSheet.show(
                {
                  options: [
                    {
                      text: 'Gallery',
                      icon: 'md-images',
                      iconColor: 'blue',
                    },
                    {
                      text: 'Camera',
                      icon: 'md-camera',
                      iconColor: 'green',
                    },
                    {
                      text: 'Cancle',
                      icon: 'close',
                      iconColor: 'red',
                    },
                  ],
                  title: 'Chose Source',
                  cancelButtonIndex: 2,
                },
                selectedIndex => {
                  if (selectedIndex == 0) {
                    launchImageLibrary(
                      {
                        quality: 1,
                        maxWidth: 200,
                        maxHeight: 200,
                      },
                      response => {
                        setSelectedImage({uri: response.uri});
                      },
                    );
                  } else if (selectedIndex == 1) {
                    launchCamera(
                      {
                        quality: 1,
                        maxHeight: 200,
                        maxWidth: 200,
                        includeBase64: true,
                      },
                      response => {
                        setSelectedImage({uri: response.uri});
                      },
                    );
                  }
                },
              );
            }}>
            <Text>Select Image</Text>
          </Button>
          <View style={styles.imageContiner}>
            <Image source={selectedImage} style={styles.image} />
          </View>
        </View>
      </View>
    </Root>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 50,
    paddingHorizontal: 25,
  },
  imageContiner: {
    marginTop: 20,
    height: 200,
    width: 200,
    backgroundColor: 'skyblue',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default App;
