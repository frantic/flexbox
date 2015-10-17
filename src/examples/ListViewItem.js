class ListViewItem extends React.Component {
  render() {
    return (
      <View style={styles.item}>
        <Image style={styles.icon} />
        <View style={styles.content}>
          <Text style={styles.title}>
            List item title
          </Text>
          <Text style={styles.description}>
            Here goes description
          </Text>
        </View>
      </View>
    );
  }
};

var IMAGE_SIZE = 60;

var styles = StyleSheet.create({
  item: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  icon: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    backgroundColor: '#336699',
    marginRight: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
  },
  description: {
    paddingTop: 4,
    color: '#777',
  }
});
