import Exploresystmsystlay from '../Explorresyystmcmpns/Exploresystmsystlay';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import LinearGradient from 'react-native-linear-gradient';

import TouchableOpacity from '../Explorresyystmcmpns/Exploresystmsystprs';

const exploresystmStoriesData = [
  {
    id: 1,
    title: 'The Tragedy of Pompeii',
    preview:
      'In 79 AD, the Roman city of Pompeii was destroyed by the eruption of Mount Vesuvius. The volcano had been quiet for centuries, so most people did not realize how dangerous it was. The eruption began suddenly with a massive column of ash rising high into the sky. Soon, pumice stones and volcanic ash started falling over the city. Many people tried to escape, but the eruption became more violent during the night. The next morning, a deadly pyroclastic flow rushed down the mountain at incredible speed. The hot gas and ash buried Pompeii under several meters of volcanic material. The city remained hidden for over 1,600 years. When archaeologists finally discovered it, they found houses, streets, and even people preserved in volcanic ash. Today, Pompeii is one of the most famous archaeological sites in the world.',
  },
  {
    id: 2,
    title: 'The Loudest Explosion Ever Heard',
    preview:
      'In 1883, the volcano Krakatoa produced one of the most powerful eruptions in recorded history. The explosion was so loud that it could be heard thousands of kilometers away. When the volcano erupted, enormous amounts of ash and rock were thrown into the atmosphere. The eruption caused massive tsunamis that destroyed many coastal towns in Indonesia. More than 36,000 people died in the disaster. The explosion also affected the global climate. Ash particles spread around the world and created spectacular red sunsets for months. After the eruption, most of the island collapsed into the ocean. Years later, a new volcano called Anak Krakatau began growing from the sea.',
  },
  {
    id: 3,
    title: "A Volcano Born in a Farmer's Field",
    preview:
      'In 1943, a farmer in Mexico noticed cracks appearing in his cornfield. Soon, smoke and ash began rising from the ground. Within a few days, a new volcano was forming. This volcano became known as Paricutin. It grew rapidly as lava and ash built a cone from the ground up. The eruption lasted for nine years and eventually destroyed two nearby villages. However, scientists had a unique opportunity to study the birth of a volcano from the very beginning. Today, Paricutin is one of the few volcanoes in the world whose entire life cycle was observed by humans.',
  },
  {
    id: 4,
    title: 'The Year Without Summer',
    preview:
      'In 1815, the volcano Mount Tambora erupted in the largest volcanic explosion of modern history. The eruption released huge amounts of ash and gas into the atmosphere. These particles blocked sunlight and caused global temperatures to drop. The following year, 1816, became known as "The Year Without Summer." Snow fell in June in parts of Europe and North America. Crops failed and food shortages affected millions of people. This event showed scientists that volcanic eruptions can influence the climate of the entire planet.',
  },
  {
    id: 5,
    title: 'The Most Active Volcano in Europe',
    preview:
      "Mount Etna is one of the most active volcanoes in the world. It has been erupting for thousands of years and continues to produce lava flows and ash clouds. Despite the danger, many people live on its slopes because the volcanic soil is extremely fertile. Farmers grow grapes, olives, and citrus fruits in the region. Scientists constantly monitor the volcano to understand its behavior and warn nearby communities about possible eruptions. Mount Etna is also a popular tourist destination, attracting visitors who want to see one of nature's most powerful forces.",
  },
  {
    id: 6,
    title: 'Hawaii Lava Rivers',
    preview:
      'The Hawaiian volcano Kilauea is famous for its flowing rivers of lava. Unlike explosive volcanoes, Kilauea often produces slow-moving lava flows that travel across the landscape. These glowing rivers can destroy forests, roads, and homes. However, the eruptions are also incredibly beautiful. At night, the bright orange lava creates spectacular views. Scientists use satellites and ground sensors to monitor the volcano and provide warnings when lava flows threaten nearby communities.',
  },
  {
    id: 7,
    title: 'A Volcano Under Ice',
    preview:
      'In 2010, the Icelandic volcano Eyjafjallajokull erupted beneath a thick glacier. The heat from the eruption melted large amounts of ice, creating huge clouds of ash and steam. The ash spread across Europe and caused major problems for air travel. Airplanes cannot safely fly through volcanic ash because it can damage jet engines. As a result, thousands of flights were canceled. The eruption showed how volcanic activity can affect modern transportation and global travel.',
  },
  {
    id: 8,
    title: 'The Birth of a New Island',
    preview:
      'In 1963, a volcanic eruption began beneath the ocean near Iceland. Explosions occurred when hot magma met cold seawater. Gradually, a new island called Surtsey rose above the surface of the sea. Scientists were fascinated because they could observe how life begins on a completely new piece of land. Over time, plants, birds, and insects started to appear. Today, Surtsey is protected and used as a natural laboratory to study the development of ecosystems.',
  },
  {
    id: 9,
    title: 'The Dangerous Beauty of Mount Fuji',
    preview:
      "Mount Fuji is the highest mountain in Japan and one of the country's most famous symbols. The volcano last erupted in 1707, covering nearby areas with ash. Although it is currently dormant, scientists continue to monitor it. Every year, thousands of climbers hike to the summit to watch the sunrise from the top. Mount Fuji is admired for its perfect cone shape and cultural importance in Japanese history and art.",
  },
  {
    id: 10,
    title: 'The Hidden Giant Beneath Yellowstone',
    preview:
      'Beneath the landscapes of Yellowstone National Park lies a massive volcanic system known as a supervolcano. This system created enormous eruptions in the distant past that shaped much of the surrounding region. Today, visitors see geysers, hot springs, and bubbling mud pools - all signs of geothermal activity beneath the surface. Although scientists carefully monitor the area, a super-eruption is extremely unlikely in the near future.',
  },
];

export type exploresystmStoryType = (typeof exploresystmStoriesData)[number];

const Exploresystmsysttries = () => {
  const navigation = useNavigation<any>();

  const exploresystmHandleBack = () => {
    navigation.goBack();
  };

  const exploresystmHandleOpenSettings = () => {
    navigation.navigate('Exploresystmsysettngs' as never);
  };

  const exploresystmHandleOpenStoryDetails = (
    exploresystmStory: exploresystmStoryType,
  ) => {
    navigation.navigate(
      'Exploresystmsysttrdet' as never,
      { exploresystmStory } as never,
    );
  };

  return (
    <Exploresystmsystlay>
      <View style={styles.exploresystmContainer}>
        <View style={styles.exploresystmTopBar}>
          <TouchableOpacity
            style={styles.exploresystmTopIconButton}
            onPress={exploresystmHandleBack}
            activeOpacity={0.8}
          >
            <Image
              source={require('../../elements/images/volclertsyoback.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={exploresystmHandleOpenSettings}
            activeOpacity={0.8}
          >
            <Image
              source={require('../../elements/images/volclertsysett.png')}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.exploresystmStoriesList}>
          {exploresystmStoriesData.map(exploresystmStory => (
            <TouchableOpacity
              key={exploresystmStory.id}
              onPress={() =>
                exploresystmHandleOpenStoryDetails(exploresystmStory)
              }
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={['#612F47', '#8A3844', '#B13D2F']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.exploresystmStoryCard}
              >
                <Text style={styles.exploresystmStoryTitle}>
                  {exploresystmStory.title}
                </Text>
                <View style={styles.exploresystmStoryPreviewWrap}>
                  <Text
                    numberOfLines={2}
                    style={styles.exploresystmStoryPreviewText}
                  >
                    {exploresystmStory.preview}
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Exploresystmsystlay>
  );
};

export default Exploresystmsysttries;

const styles = StyleSheet.create({
  exploresystmContainer: {
    flex: 1,
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 22,
  },
  exploresystmTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  exploresystmTopIconButton: {
    minWidth: 36,
    minHeight: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exploresystmBackIcon: {
    fontSize: 34,
    color: '#FF8E3A',
    fontWeight: '700',
  },
  exploresystmStoriesList: {
    marginTop: 16,
    rowGap: 16,
    paddingBottom: 24,
  },
  exploresystmStoryCard: {
    borderRadius: 24,
    overflow: 'hidden',
  },

  exploresystmStoryTitle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,

    fontWeight: '600',
    paddingVertical: 16,
    paddingHorizontal: 14,
  },

  exploresystmStoryPreviewWrap: {
    backgroundColor: '#0000004D',
    paddingHorizontal: 10,

    paddingVertical: 8,

    minHeight: 60,

    justifyContent: 'center',
  },
  exploresystmStoryPreviewText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '300',
  },
});
