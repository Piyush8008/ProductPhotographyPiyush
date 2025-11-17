// PhotographyScreen.tsx
import React, { useCallback, useMemo, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  ScrollView,
  Platform,
} from "react-native";
import { Feather, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  Login: undefined;
  Photography: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Photography">;

const WINDOW_WIDTH = Dimensions.get("window").width;
const HORIZONTAL_PADDING = 14;
const GAP = 12;
const NUM_COLS = 3;
const GRID_ITEM_SIZE = Math.floor(
  (WINDOW_WIDTH - HORIZONTAL_PADDING * 2 - GAP * (NUM_COLS - 1)) / NUM_COLS
);

type TemplateItem = {
  id: string;
  image: any;
  category: string;
  isSelected: boolean;
};

export default function PhotographyScreen({ navigation }: Props) {
  const [prompt, setPrompt] = useState<string>("");
  const [templates, setTemplates] = useState<TemplateItem[]>(() => [
    {
      id: "1",
      image: require("../assets/351-200x3001.jpg"),
      category: "Photography",
      isSelected: false,
    },
    {
      id: "2",
      image: require("../assets/577-200x3002.jpg"),
      category: "Photography",
      isSelected: false,
    },
    {
      id: "3",
      image: require("../assets/419-200x3003.jpg"),
      category: "Photography",
      isSelected: false,
    },
    {
      id: "4",
      image: require("../assets/660-200x3004.jpg"),
      category: "Photography",
      isSelected: false,
    },
    {
      id: "5",
      image: require("../assets/737-200x3005.jpg"),
      category: "Photography",
      isSelected: false,
    },
    {
      id: "6",
      image: require("../assets/634-200x3006.jpg"),
      category: "Photography",
      isSelected: false,
    },
  ]);

  const [monoTemplates] = useState<TemplateItem[]>(() => [
    {
      id: "m1",
      image: require("../assets/459-200x3007.jpg"),
      category: "Monochrome",
      isSelected: false,
    },
    {
      id: "m2",
      image: require("../assets/616-200x3008.jpg"),
      category: "Monochrome",
      isSelected: false,
    },
    {
      id: "m3",
      image: require("../assets/621-200x3009.jpg"),
      category: "Monochrome",
      isSelected: false,
    },
  ]);

  const onSelectTemplate = useCallback((id: string) => {
    setTemplates(prev =>
      prev.map(t => ({
        ...t,
        isSelected: t.id === id ? !t.isSelected : false,
      }))
    );
  }, []);

  const renderTemplate = useCallback(
    ({ item }: { item: TemplateItem }) => {
      return (
        <TouchableOpacity
          activeOpacity={0.85}
          style={[styles.gridItem, { width: GRID_ITEM_SIZE, height: GRID_ITEM_SIZE }]}
          onPress={() => onSelectTemplate(item.id)}
        >
          <Image source={item.image} style={styles.gridImage} />
          {item.isSelected && (
            <View style={styles.checkBadge}>
              <Feather name="check" size={14} color="#05331f" />
            </View>
          )}
        </TouchableOpacity>
      );
    },
    [onSelectTemplate]
  );

  const renderMono = useCallback(
    ({ item }: { item: TemplateItem }) => (
      <View style={[styles.gridItem, { width: GRID_ITEM_SIZE, height: GRID_ITEM_SIZE }]}>
        <Image source={item.image} style={styles.gridImage} />
      </View>
    ),
    []
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={styles.safe.backgroundColor} />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.headerLeft} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Photography</Text>

          <TouchableOpacity style={styles.avatarWrap}>
            <Image source={require("../assets/avatar.png")} style={styles.avatar} />
          </TouchableOpacity>
        </View>

        {/* Tabs row */}
        <View style={styles.tabsRow}>

          {[
            { key: "home", label: "Home", icon: "home-outline", color: "#07E5A8" },
            { key: "videos", label: "Videos", icon: "video-outline", color: "#07E5A8" },
            { key: "photography", label: "Photography", icon: "camera-outline", color: "#FF5FB0" },
            { key: "action", label: "In action", icon: "play-circle-outline", color: "#F6D24A" },
            { key: "commercial", label: "Commercial", icon: "briefcase-outline", color: "#FFA24A" },
            { key: "ar", label: "AR", icon: "star-outline", color: "#FFC85A" },
          ].map((t, idx) => {
            const isActive = t.key === "photography";
            const iconName = t.icon as any;
            const iconColor = isActive ? t.color : "#8b8b8b";
            return (
              <View key={t.key} style={styles.tabItem}>
                <View
                  style={[
                    styles.tabIconHolder,
                    isActive && {
                      borderWidth: 1,
                      borderColor: t.color,
                      shadowColor: t.color,
                      shadowOffset: { width: 0, height: 6 },
                      shadowOpacity: 0.08,
                      elevation: 2,
                    },
                  ]}
                >
                  {/* real icon */}
                  <MaterialCommunityIcons name={iconName} size={20} color={iconColor} />
                </View>
                <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]} numberOfLines={1}>
                  {t.label}
                </Text>
              </View>
            );
          })}
        </View>

        {/* Search bar */}
        <View style={styles.searchBox}>
          <Feather name="search" size={18} color="#7f7f7f" style={{ marginLeft: 10 }} />
          <TextInput
            placeholder={'Search for keyword "flowers"...'}
            placeholderTextColor="#8f8f8f"
            style={styles.searchInput}
            underlineColorAndroid="transparent"
            returnKeyType="search"
          />
        </View>

        {/* Prompt input */}
        <View style={styles.promptBox}>
          <TextInput
            placeholder="Describe the scene around your product..."
            placeholderTextColor="#A3A3A3"
            style={styles.promptInput}
            value={prompt}
            onChangeText={setPrompt}
            multiline
          />
          <TouchableOpacity style={styles.magicBtn} activeOpacity={0.8}>
            <Feather name="zap" size={16} color="#07E5A8" />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Or try suggested templates</Text>

        <FlatList
          data={templates}
          keyExtractor={item => item.id}
          renderItem={renderTemplate}
          numColumns={NUM_COLS}
          columnWrapperStyle={styles.colWrapper}
          scrollEnabled={false} // let the outer ScrollView handle scrolling
          ItemSeparatorComponent={() => <View style={{ height: GAP }} />}
          contentContainerStyle={{ paddingBottom: 8 }}
        />

        <Text style={[styles.sectionTitle, { marginTop: 8 }]}>Monochrome</Text>

        {/* Monochrome grid */}
        <FlatList
          data={monoTemplates}
          keyExtractor={item => item.id}
          renderItem={renderMono}
          numColumns={NUM_COLS}
          columnWrapperStyle={styles.colWrapper}
          scrollEnabled={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#0E0E10",
  },
  container: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight ?? 8 : 12,
    paddingBottom: 40,
  },
  headerRow: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  headerLeft: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    position: "absolute",
    left: 0,
    right: 0,
    alignSelf: "center",
  },
  avatarWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },

  tabsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    alignItems: "center",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
  },
  tabIconHolder: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#141416",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  tabIconActive: {
    borderWidth: 1,
    borderColor: "#07E5A8",
    shadowColor: "#07E5A8",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    elevation: 2,
  },
  tabLabel: {
    fontSize: 11,
    color: "#9B9B9B",
    maxWidth: 70,
    textAlign: "center",
  },
  tabLabelActive: {
    color: "#07E5A8",
    fontWeight: "600",
  },

  searchBox: {
    height: 44,
    backgroundColor: "#151517",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 8,
    color: "#fff",
    fontSize: 14,
  },

  promptBox: {
    backgroundColor: "#151517",
    borderRadius: 12,
    minHeight: 88,
    padding: 12,
    marginBottom: 12,
    justifyContent: "center",
    position: "relative",
  },
  promptInput: {
    color: "#fff",
    fontSize: 14,
    paddingRight: 46,
  },
  magicBtn: {
    position: "absolute",
    right: 12,
    top: 12,
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#0E0E10",
    borderWidth: 1,
    borderColor: "#0F3A2C",
    alignItems: "center",
    justifyContent: "center",
  },

  sectionTitle: {
    color: "#bdbdbd",
    fontSize: 13,
    marginBottom: 8,
  },

  colWrapper: {
    justifyContent: "space-between",
    marginBottom: GAP,
  },
  gridItem: {
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#222225",
  },
  gridImage: {
    width: "100%",
    height: "100%",
  },
  checkBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#07E5A8",
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
});
