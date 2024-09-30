import React, { useState, useRef } from 'react';
import {
    View,
    FlatList,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Text,
} from 'react-native';
import { ResizeMode, Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const ShortVideo = ({ item, isActive }: any) => {
    const videoRef = useRef(null);

    React.useEffect(() => {
        if (isActive) {
            videoRef.current?.playAsync?.();
        } else {
            videoRef.current?.pauseAsync?.();
        }
    }, [isActive]);

    return (
        <View style={styles.videoContainer}>
            <Video
                ref={videoRef}
                source={{ uri: item.videoUri }}
                style={styles.video}
                resizeMode={ResizeMode.COVER}
                isLooping
                shouldPlay={isActive}
            />
            <View style={styles.overlay}>
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.actionButton}>
                        <Ionicons name="heart" size={28} color="white" />
                        <Text style={styles.actionText}>{item.likes}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <Ionicons name="chatbubble" size={28} color="white" />
                        <Text style={styles.actionText}>{item.comments}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <Ionicons name="share-social" size={28} color="white" />
                        <Text style={styles.actionText}>Share</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const ShortsLayout = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef(null);

    const videos = [
        {
            id: '1', title: '@Ramesha Proposal', videoUri: 'https://ik.imagekit.io/quackmagic/nimmatoken/FigmaBlinks.mp4?updatedAt=1727678605375', likes: '10K', comments: '1.2K'
        },
        { id: '2', title: 'Funny Cat', videoUri: 'https://example.com/video2.mp4', likes: '15K', comments: '2.5K' },
        { id: '3', title: 'Magic Trick', videoUri: 'https://example.com/video3.mp4', likes: '8K', comments: '800' },
        // Add more video objects as needed
    ];

    const onViewableItemsChanged = useRef(({ changed }: any) => {
        if (changed && changed.length > 0) {
            setActiveIndex(changed[0].index);
        }
    }).current;

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50
    }).current;

    const renderItem = ({ item, index }: any) => (
        <ShortVideo item={item} isActive={index === activeIndex} />
    );

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={videos}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                pagingEnabled
                vertical
                showsVerticalScrollIndicator={false}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    videoContainer: {
        width: width,
        height: height,
    },
    video: {
        flex: 1,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'space-between',
        padding: 20,
    },
    title: {
        color: 'white',
        fontSize: 18,
        borderColor: "blue",
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    actions: {
        alignItems: 'flex-end',
    },
    actionButton: {
        color: 'white',
        alignItems: 'center',
        marginBottom: 20,
    },
    actionText: {
        color: 'white',
        marginTop: 5,
    },
});

export default ShortsLayout;