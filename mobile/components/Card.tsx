import React, { useEffect, useState, useCallback } from 'react';
import {
  Card as PaperCard,
  IconButton,
  Avatar,
  Title,
  Divider,
  Chip
} from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import _ from 'lodash';

import { rspWidth, rspHeight } from '../utils/Responsive';
import LocalStorage from '../services/LocalStorage';
import Collapsible from 'react-native-collapsible';

export type CardProps = View['props'] & {
  title: string;
  subtitle: string;
  relationships: {
    title: string;
    subitems: {
      id: number;
      title: string;
    }[];
  }[];
  image?: { uri: string };
  onPress?: () => void;
};

export default function Card({
  style,
  title,
  subtitle,
  image,
  relationships,
  onPress
}: CardProps) {
  const LeftContent = (props: any) => {
    if (image) {
      return <Avatar.Image {...props} source={image} />;
    } else {
      return <Avatar.Text {...props} label={initials(title)} />;
    }
  };

  const RightContent = (props: any) => (
    <IconButton {...props} icon="chevron-right" onPress={onPress} />
  );

  return (
    <>
      <PaperCard style={[styles.card, style]}>
        <PaperCard.Title
          titleStyle={styles.cardTitle}
          subtitleStyle={styles.cardDesc}
          subtitleNumberOfLines={3}
          title={title}
          subtitle={subtitle}
          left={LeftContent}
          right={RightContent}
        />
        <PaperCard.Content>
          {_.map(relationships, ({ title, subitems }) => {
            return (
              <View key={title}>
                <Title style={styles.cardTitle}>{title}</Title>
                <View style={styles.infoLine}>
                  {_.map(subitems, ({ id, title }) => (
                    <Chip key={id} icon="filmstrip">
                      {title}
                    </Chip>
                  ))}
                </View>
                <Divider style={styles.divider} />
              </View>
            );
          })}
        </PaperCard.Content>
      </PaperCard>
    </>
  );
}

function initials(name: string): string {
  return _.replace(name, /[a-z\s\d]/g, '').substr(0, 2);
}

const styles = StyleSheet.create({
  card: {
    marginVertical: rspHeight(25),
    elevation: 5
  },
  cardInside: {
    marginVertical: rspHeight(25),
    elevation: 5,
    height: rspHeight(200),
    marginTop: rspHeight(10)
  },
  cardTitle: {
    fontFamily: 'nunito-bold',
    fontSize: rspWidth(38)
  },
  cardDesc: {
    fontFamily: 'nunito-regular',
    fontSize: rspWidth(36)
  },
  infoLine: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  divider: {
    marginTop: rspHeight(10)
  }
});
