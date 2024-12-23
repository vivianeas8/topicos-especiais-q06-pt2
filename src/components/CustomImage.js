import { Text, StyleSheet, Image } from 'react-native';

export default function CustomImage({ fromWeb, image, title, width, height }) {
  return (
    <>
      <Text style={styles.tituloImagem}>{title}</Text>
      {fromWeb || <Image source={image} style={{width: width, height: height, alignSelf: 'center'}} />}
      {!fromWeb || <Image source={{uri:image}} style={{width: width, height: height, alignSelf: 'center'}} />}
    </>
  );
}

const styles = StyleSheet.create({
  tituloImagem: {
    paddingTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
