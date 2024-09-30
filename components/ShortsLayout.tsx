import React, { useState, useRef } from 'react';
import {
    View,
    FlatList,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Text,
    Pressable,
} from 'react-native';
import { ResizeMode, Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const ShortVideo = ({ item, isActive }: { item: any; isActive: boolean }) => {
    const videoRef = useRef<any>();
    const [status, setStatus] = useState<any>({});

    React.useEffect(() => {
        if (isActive) {
            videoRef.current.playAsync();
        } else {
            videoRef.current.pauseAsync();
        }
    }, [isActive]);

    const handleVideoPress = async () => {
        if (status.isPlaying) {
            await videoRef.current.pauseAsync();
        } else {
            await videoRef.current.playAsync();
        }
    };

    return (
        <Pressable style={styles.videoContainer} onPress={handleVideoPress}>
            <Video
                ref={videoRef}
                source={{ uri: item.videoUri }}
                style={styles.video}
                resizeMode={ResizeMode.COVER}
                isLooping
                shouldPlay={isActive}
                onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={styles.gradient}
            />
            <View style={styles.overlay}>
                <View style={styles.topOverlay}>
                    {status.isPlaying ? (
                        <Ionicons name="play" size={40} color="white" style={styles.playIcon} />
                    ) : (
                        <Ionicons name="pause" size={40} color="white" style={styles.playIcon} />
                    )}
                </View>
                <View style={styles.bottomOverlay}>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.description}>{item.description}</Text>
                    </View>
                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.actionButton}>
                            <Ionicons name="thumbs-up" size={28} color="white" />
                            <Text style={styles.actionText}>{item.likes}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton}>
                            <Ionicons name="thumbs-down" size={28} color="white" />
                            <Text style={styles.actionText}>{item.comments}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton}>
                            <Ionicons name="share-social" size={28} color="white" />
                            <Text style={styles.actionText}>Share</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Pressable>
    );
};

const ShortsLayout = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef(null);

    const videos = [
        { id: '1', title: 'Cool Dance', description: 'Check out these amazing moves!', videoUri: 'https://ik.imagekit.io/quackmagic/nimmatoken/FigmaBlinks.mp4?updatedAt=1727678605375', likes: '10K', comments: '1.2K' },
        { id: '2', title: 'Funny Cat', description: 'This cat is hilarious!', videoUri: 'https://example.com/video2.mp4', likes: '15K', comments: '2.5K' },
        { id: '3', title: 'Magic Trick', description: 'You wont believe your eyes!', videoUri: 'https://example.com/video3.mp4', likes: '8K', comments: '800' },

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
                // vertical
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
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '50%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'space-between',
    },
    topOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    playIcon: {
        opacity: 0.7,
    },
    bottomOverlay: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        padding: 20,
    },
    textContainer: {
        flex: 1,
        marginRight: 20,
    },
    title: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    description: {
        color: 'white',
        fontSize: 14,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    actions: {
        alignItems: 'center',
    },
    actionButton: {
        alignItems: 'center',
        marginBottom: 20,
    },
    actionText: {
        color: 'white',
        marginTop: 5,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
});

export default ShortsLayout;