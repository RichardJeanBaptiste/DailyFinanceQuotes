/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React, {useState} from 'react';
import { Dimensions } from 'react-native';
import { Pressable } from 'react-native';
import { Modal } from 'react-native';
import {SafeAreaView, Text, StyleSheet, View, Image, Linking} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../styles/index';

function AuthorModal(props){
  const [modalVisible, setModalVisible] = useState(false);

  return (
      <View style={styles.cardStyle}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
                  style={styles.authorImage}
                  source={{
                    uri: props.authorImage,
                  }}
          />
        </TouchableOpacity>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
          >
              <View style={styles.modalView}>
                <Image
                    style={styles.modalImage}
                    source={{
                      uri: props.authorImage,
                    }}
                  />
                 <View style={{marginTop: '5%', flex: 1}}>
                    <Text style={styles.lifeText}>{props.Born}</Text>
                    <Text style={styles.lifeText}>{props.Died}</Text>
                    <ScrollView style={{height: '50%'}} contentContainerStyle={{paddingBottom: '15%'}}>
                      <Text style={styles.infoText}>
                          {props.info}
                      </Text>
                    </ScrollView>
                  </View>
                  <View style={styles.modalFooter}>
                    <Pressable style={{paddingRight: 35}} onPress={() => {setModalVisible(!modalVisible);}}><Text style={styles.footerText}>Close</Text></Pressable>
                    <Pressable onPress={() => {Linking.openURL(props.wikiLink);}}><Text style={styles.footerText}>Wiki</Text></Pressable>
                  </View>
              </View>
          </Modal>
        <Text style={styles.textStyle}>{props.author}</Text>
      </View>
  );
}

function Authors() {

    return (
      <SafeAreaView>
        <ScrollView style={styles.scrollStyle} contentContainerStyle={{paddingBottom: '35%'}}>
          <View style={styles.rowStyle}>
            <AuthorModal
              author = "Warren Buffett"
              authorImage= "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Warren_Buffett_KU_Visit.jpg/492px-Warren_Buffett_KU_Visit.jpg"
              Born= "Born - August 30, 1930"
              info= "Warren Edward Buffett is an American investor, business tycoon, philanthropist, and the chairman and CEO of Berkshire Hathaway. He is considered one of the most successful investors in the world and has a net worth of over US$85.6 billion as of December 2020, making him the world's fourth-wealthiest person."
              wikiLink= "https://en.wikipedia.org/wiki/Warren_Buffett"
            />
            <AuthorModal
              author = "Benjamin Graham"
              authorImage = "https://upload.wikimedia.org/wikipedia/commons/7/71/Benjamin-Graham-fundamental.jpg"
              Born = "Born - May 9, 1894"
              Died = "Died - September 21, 1976"
              info = 'Benjamin Graham was a British-born American economist, professor and investor. He is widely known as the "father of value investing", and wrote two of the founding texts in neoclassical investing: Security Analysis (1934) with David Dodd, and The Intelligent Investor (1949).'
              wikiLink = "https://en.wikipedia.org/wiki/Benjamin_Graham"
            />
            <AuthorModal
              author = "Robert Kiyosaki"
              authorImage = "https://upload.wikimedia.org/wikipedia/commons/9/98/Robert_Kiyosaki_by_Gage_Skidmore.jpg"
              Born = "Born - April 8, 1947"
              info = "Robert Toru Kiyosaki is an American businessman and author. Kiyosaki is the founder of Rich Global LLC and the Rich Dad Company, a private financial education company that provides personal finance and business education to people through books and videos."
              wikiLink = "https://en.wikipedia.org/wiki/Robert_Kiyosaki"
            />
          </View>
        {/**********************************************************************************************************/}
          <View style={styles.rowStyle2}>
            <AuthorModal
              author = "Andrew Carnegie"
              authorImage = "https://upload.wikimedia.org/wikipedia/commons/b/b5/Andrew_Carnegie%2C_three-quarter_length_portrait%2C_seated%2C_facing_slightly_left%2C_1913.jpg"
              Born = "Born - November 25, 1835"
              Died = "Died - August 11, 1919"
              info = "Andrew Carnegie was a Scottish-American industrialist and philanthropist. Carnegie led the expansion of the American steel industry in the late 19th century and became one of the richest Americans in history."
              wikiLink = "https://en.wikipedia.org/wiki/Andrew_Carnegie"
            />
            <AuthorModal
              author = "Mellody Hobson"
              authorImage = "https://upload.wikimedia.org/wikipedia/commons/7/7d/Mellody_Hobson.jpg"
              Born = "Born - April 3, 1969"
              info = "Mellody Hobson is an American businesswoman who is the chairwoman of Starbucks Corporation. She was the president and co-CEO of Ariel Investments. She is the former chairwoman of DreamWorks Animation, having stepped down after negotiating the acquisition of DreamWorks Animation SKG, Inc., by NBCUniversal in August, 2016. In 2017, she became the first African-American woman to head The Economic Club of Chicago. She was also named to chair the board of directors of Starbucks in 2021, making her one of the highest profile African American corporate directors."
              wikiLink = "https://en.wikipedia.org/wiki/Mellody_Hobson"
            />
            <AuthorModal
              author = "J.P. Morgan"
              authorImage = "https://upload.wikimedia.org/wikipedia/commons/a/a6/JP_Morgan.jpg"
              Born = "Born - April 17, 1837"
              Died = "Died - March 31, 1913"
              info = "John Pierpont Morgan was an American financier and banker who dominated corporate finance on Wall Street throughout the Gilded Age. As the head of the banking firm that ultimately became known as J.P. Morgan and Co., he was a driving force behind the wave of industrial consolidation in the United States spanning the late 19th and early 20th centuries."
              wikiLink = "https://en.wikipedia.org/wiki/J._P._Morgan"
            />
          </View>
        {/**********************************************************************************************************/}
        <View style={styles.rowStyle2}>
          <AuthorModal
            author = "Suze Orman"
            authorImage = "https://upload.wikimedia.org/wikipedia/commons/a/ab/Suze_Orman_Time_100_Shankbone.jpg"
            Born = "Born - June 5, 1951"
            info = 'Susan Lynn "Suze" Orman is an American financial advisor, author, and podcast host. In 1987, she founded the Suze Orman Financial Group. Her work as a financial advisor gained notability with The Suze Orman Show, which ran on CNBC from 2002 to 2015.'
            wikiLink = "https://en.wikipedia.org/wiki/Suze_Orman"
          />
          <AuthorModal
            author = "John D. Rockefeller"
            authorImage = "https://upload.wikimedia.org/wikipedia/commons/6/6f/John_D._Rockefeller_1885.jpg"
            Born = "Born - July 8, 1839"
            Died = "Died - May 23, 1937"
            info = "John Davison Rockefeller Sr. was an American business magnate and philanthropist. He is widely considered the wealthiest American of all time and the richest person in modern history."
            wikiLink = "https://en.wikipedia.org/wiki/John_D._Rockefeller"
          />
          <AuthorModal
            author = "Cornelius Vanderbilt"
            authorImage = "https://upload.wikimedia.org/wikipedia/commons/5/57/Cornelius_Vanderbilt_Daguerrotype2.jpg"
            Born = "Born - May 27, 1794"
            Died = "Died - January 4, 1877"
            info = "Cornelius Vanderbilt was an American business magnate who built his wealth in railroads and shipping. After working with his father's business, Vanderbilt worked his way into leadership positions in the inland water trade and invested in the rapidly growing railroad industry."
            wikiLink = "https://en.wikipedia.org/wiki/Cornelius_Vanderbilt"
          />
        </View>
         {/**********************************************************************************************************/}
         <View style={styles.rowStyle2}>
          <AuthorModal
            author = "Jim Simons"
            authorImage = "https://upload.wikimedia.org/wikipedia/commons/b/b4/James_Simons_2007.jpg"
            Born = "Born - April 25, 1938"
            info = 'James Harris Simons is an American mathematician, billionaire hedge fund manager, and philanthropist.[4] He is the founder of Renaissance Technologies, a quantitative hedge fund based in Setauket-East Setauket, New York. '
            wikiLink = "https://en.wikipedia.org/wiki/Jim_Simons_(mathematician)"
          />
          <AuthorModal
            author = "Bernard Mannes Baruch"
            authorImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/BARUCH%2C_BERNARD_2.jpg/220px-BARUCH%2C_BERNARD_2.jpg"
            Born = "Born - August 19, 1870"
            Died = "Died - 	June 20, 1965"
            info = "Bernard Mannes Baruch was an American financier and statesman. According to historian Thomas A. Krueger: For half a century Bernard Baruch was one of the country's richest and most powerful men. A great speculator, public official, presidential counselor, political benefactor, and indefatigable almonor, his public life provides a clear view of the inner workings of the American political system."
            wikiLink = "https://en.wikipedia.org/wiki/Bernard_Baruch"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
      );
}

export default Authors;
