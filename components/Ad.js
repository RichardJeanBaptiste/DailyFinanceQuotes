/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {} from 'react';
import {View} from 'react-native';
import NativeAdView, { CallToActionView, IconView, HeadlineView, TaglineView, AdvertiserView, AdBadge} from 'react-native-admob-native-ads';



function BannerAd() {
    return (
    <View style={{flex: 1, marginTop:'4%', paddingTop:15}}>
        <NativeAdView style={{
            width: '95%',
            alignSelf: 'center',
            height: 100,
        }}
        adUnitID="ca-app-pub-4929537070408822/6473807185"
        >
          <View style={{
            height: 100,
            width: '100%',
          }}
        >
          <AdBadge />
          <View
            style={{
              height: 100,
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              paddingHorizontal: 10,
            }}
          >
            <IconView
              style={{
                width: 60,
                height: 60,
              }}
            />
            <View
              style={{
                width: '65%',
                maxWidth: '65%',
                paddingHorizontal: 6,
              }}
            >
              <HeadlineView
                style={{
                  fontWeight: 'bold',
                  fontSize: 13,
                  color: 'white',
                }}
              />
              <TaglineView
                numberOfLines={1}
                style={{
                  fontSize: 11,
                  color: 'white',
                }}
              />
              <AdvertiserView
                style={{
                  fontSize: 10,
                  color: 'white',
                }}
              />
            </View>

            <CallToActionView
              style={{
                height: 45,
                paddingHorizontal: 12,
                backgroundColor: 'purple',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                elevation: 10,
              }}
              textStyle={{ color: 'white', fontSize: 14 }}
            />
          </View>
        </View>
        </NativeAdView>
    </View>
    );
}

export default BannerAd;

