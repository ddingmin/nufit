import React from 'react'
// import { useState, useEffect } from 'react'
// import { Alert} from 'react-native'
import { Text, StyleSheet, View, Image, Button } from 'react-native'
import morningimg from '../assets/morning_ico_white.png'
import lunchimg from '../assets/afternoon_ico_white.png'
import dinnerimg from '../assets/night_ico_white.png'
import ProgressCircle from '../components/ProgressCircle';
import ProgressBar from '../components/ProgressBar';
import TopBar from '../components/TopBar';
//import axios from 'axios';

const StaticPie = ({}) => {

    const carbgoal =200;
    const carbprogress = 50;
    const proteingoal = 110;
    const proteinprogress = 12;
    const fatgoal = 40;
    const fatprogress = 20;
    const morning = 500;
    const lunch = 500;
    const dinner = 500;
    const remainCalories = 1200;
    const progressValue = 1000;
    const carbsValue = 20;
    const proteinValue = 30;
    const fatValue = 50;

    //api 통신 할 때 사용
    // const [carbgoal, setCarbGoal] = useState(0);
    // const [carbprogress, setCarbProgress] = useState(0);
    // const [proteingoal, setProteinGoal] = useState(0);
    // const [proteinprogress, setProteinProgress] = useState(0);
    // const [fatgoal, setFatGoal] = useState(0);
    // const [fatprogress, setFatProgress] = useState(0);
    // const [morning, setMorning] = useState(0);
    // const [lunch, setLunch] = useState(0);
    // const [dinner, setDinner] = useState(0);
    // const [remainCalories, setRemainCalories] = useState(0);
    // const [progressValue, setProgressValue] = useState(0);
    // const [carbsValue, setCarbsValue] = useState(0);
    // const [proteinValue, setProteinValue] = useState(0);
    // const [fatValue, setFatValue] = useState(0);
    
    // useEffect(() => {
    //     fetchData();
    // }, []);
    
    // const fetchData = async () => {
    //     try {
    //     const response = await axios.get('엔드포인트');
    //     const data = response.data;
    
    //     setCarbGoal(data.carbgoal);
    //     setCarbProgress(data.carbprogress);
    //     setProteinGoal(data.proteingoal);
    //     setProteinProgress(data.proteinprogress);
    //     setFatGoal(data.fatgoal);
    //     setFatProgress(data.fatprogress);
    //     setMorning(data.morning);
    //     setLunch(data.lunch);
    //     setDinner(data.dinner);
    //     setRemainCalories(data.remainCalories);
    //     setProgressValue(data.progressValue);
    //     setCarbsValue(data.carbsValue);
    //     setProteinValue(data.proteinValue);
    //     setFatValue(data.fatValue);
    //     } catch (error) {
    //     Alert.alert('error');
    //     }
        

  return (
    
    <View style={styles.container}>
        
        <TopBar/>
        
        <View style={styles.shadowbox}>
            <Text style={styles.todaytext}>오늘 하루</Text>
            <View style={styles.container4}>
                <View style={styles.container2}>
                <ProgressCircle
                    progress={progressValue}
                    carbspercent={carbsValue}
                    proteinpercent={proteinValue}
                    fatpercent={fatValue}
                />
                </View>
                <View style={styles.container3}>
                    <View style={[{flexDirection: 'row'}, {alignItems: 'center'}]}>
                        <View style={styles.circle1} />
                        <Text style={styles.infotext}>순탄수화물</Text>
                    </View>
                    <Text style={styles.percentfont}>{carbsValue}% {"\n"}</Text>
                    <View style={[{flexDirection: 'row'}, {alignItems: 'center'}]}>
                        <View style={styles.circle2} />
                        <Text style={styles.infotext}>단백질</Text>
                    </View>
                    <Text style={styles.percentfont}>{proteinValue}% {"\n"}</Text>
                    <View style={[{flexDirection: 'row'}, {alignItems: 'center'}]}>
                        <View style={styles.circle3} />
                        <Text style={styles.infotext}>지방</Text>
                    </View>
                    <Text style={styles.percentfont}>{fatValue}%</Text>
                </View>
            </View>
            <View style={styles.container5}>
                <ProgressBar label="단백질" goal={proteingoal} progress={proteinprogress} />
                <ProgressBar label="탄수화물" goal={carbgoal} progress={carbprogress} />
                <ProgressBar label="지방" goal={fatgoal} progress={fatprogress} />
            </View>
            <View style={styles.container6}>
                <Text style={[{color: '#fff'}, {fontSize: 14}]}>{remainCalories}kcal 더 먹을 수 있어요</Text>
                <View style={styles.container7}>
                    <Image source={morningimg}/>
                    <Text style={styles.timefont}> 아침</Text>
                    <Text style={styles.percentfont}>{morning}kcal</Text>
                </View>
                <View style={styles.container7}>
                    <Image source={lunchimg}/>
                    <Text style={styles.timefont}> 점심</Text>
                    <Text style={styles.percentfont}>{lunch}kcal</Text>
                </View>
                <View style={styles.container7}>
                    <Image source={dinnerimg}/>
                    <Text style={styles.timefont}> 저녁</Text>
                    <Text style={styles.percentfont}>{dinner}kcal</Text>
                </View>

            </View>
        </View>
        
        
    </View>
    
    

  );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1, 
        
       
    },
    container2: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 2, 
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
    },
    container3: {
        alignItems: 'flex-start',
       
        flex: 1, 
        marginTop: 20,
    },
    container4: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1, 
        flexDirection: 'row',
       
    },
    container5: {
        width: 300,
        flex: 0.5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
      
       
    },
    container6: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.8, 
        backgroundColor: '#17AE9C',
        marginBottom: 30,
        width: 300,
        borderRadius: 10,
        

    },
    shadowbox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#00D7BD',
        paddingHorizontal: 0,
        paddingBottom: 5,
        borderRadius: 15,
        marginHorizontal: 30,
        marginVertical: 50,
        marginBottom: 80,
        shadowColor: '#19C1AD',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2.62,
        elevation: 6,
    },
    todaytext: {
        marginRight: 230,
        color: '#fff',
        fontSize: 16,
        marginTop: 20,
        fontFamily: 'Pretendard-SemiBold'
    },
    infotext: {
        color: '#fff',
        fontSize: 12,
        marginLeft: 5,
    },
    percentfont: {
        color: '#fff',
        fontSize: 17,
    },
    circle1: {
        width: 8,
        height: 8,
        borderRadius: 100/2,
        backgroundColor: '#FFF',
    },
    circle2: {
        width: 8,
        height: 8,
        borderRadius: 100/2,
        backgroundColor: '#D5F12B',
    },
    circle3: {
        width: 8,
        height: 8,
        borderRadius: 100/2,
        backgroundColor: '#000000',
    },
    container7: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: 35,
        marginTop: 3,

    },
    timefont: {
        color: '#A2DFD7',
        fontSize: 16,
        marginRight: 120,
    }
})

export default StaticPie;

