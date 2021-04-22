import React, { useState } from 'react';
import {
	StyleSheet,
	TouchableWithoutFeedback,
	Keyboard,
	ScrollView,
	TextInput,
	KeyboardAvoidingView,
	textarea,
	Alert,
	View,
	SafeAreaView,
	ViewComponent
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
	Layout,
	Text,
	Button,
	Input,
	Select,
	SelectItem,
	IndexPath,
	Icon,
	Radio,
	RadioGroup
} from '@ui-kitten/components';
import InputScrollView from 'react-native-input-scroll-view';
import { Dimensions } from 'react-native';
import Slider from '@react-native-community/slider';
import { HeaderHeightContext } from '@react-navigation/stack';
import Firebase from '../../config/firebase';

const types = [ 'Dining', 'On-Campus Facilities', 'Classes', 'Professors' ];
const academicYears = [ 'Freshman', 'Sophomore', 'Junior', 'Senior' ];

const questions = [
	[ 'Before 11pm', '11pm-12am', '12am-1am', '1am-2am', 'After 2am' ],
	[ 'None', '0-1hr', '1-3hrs', '3-5hrs', 'Over 5hrs' ],
	[ 'Not at all', '0-1hr', '1-3hrs', '3-5hrs', 'Primary focus' ],
	[ 'Not at all', '0-1hr', '1-3hrs', '3-5hrs', 'Primary focus' ],
	[ 'Never', 'Rarely', 'Sometimes', 'Often', 'Very Often' ],
	[ 'Absolute silence', 'Quiet', 'A bit of noise', 'Loud', 'Very Loud' ],
	[ 'Very messy', 'Slightly messy', 'In the middle', 'Slightly neat', 'Very neat' ]
];

const ExitIcon = (props) => <Icon {...props} name="close-outline" />;
const trashIcon = (props) => <Icon {...props} name="trash-2" />;

export default (roommateProfile = ({ navigation, route }) => {
	const currentUser = route.params.currentUser;
	const currentUserProfile = route.params.currentUserProfile;
	const key = route.params.key;
	console.log('roommmate profile');
	console.log(currentUserProfile);
	let cName = '';
	let cEmail = '';
	let cMajor = '';
	let cSelectedIndex = new IndexPath(0);
	let cBedtimeVal = 0;
	let cVideogameVal = 0;
	let cAcademicVal = 0;
	let cSocialVal = 0;
	let cPeopleVal = 0;
	let cBorrowVal = 0;
	let cNoiseVal = 0;
	let cNeatVal = 0;
	let cPara = '';
	let cSmoker = false;
	let cSex = false;
	let cFilled = false;

	if (currentUserProfile != null) {
		cName = currentUserProfile.name;
		cEmail = currentUserProfile.email;
		cMajor = currentUserProfile.major;

		if (currentUserProfile.year === 'Sophomore') {
			cSelectedIndex = new IndexPath(1);
		} else if (currentUserProfile.year === 'Junior') {
			cSelectedIndex = new IndexPath(2);
		} else if (currentUserProfile.year === 'Senior') {
			cSelectedIndex = new IndexPath(3);
		}
		cBedtimeVal = currentUserProfile.bedtimeVal[0];
		cVideogameVal = currentUserProfile.videogameVal[0];
		cAcademicVal = currentUserProfile.academicVal[0];
		cSocialVal = currentUserProfile.socialVal[0];
		cPeopleVal = currentUserProfile.peopleVal[0];
		cBorrowVal = currentUserProfile.borrowVal[0];
		cNoiseVal = currentUserProfile.noiseVal[0];
		cNeatVal = currentUserProfile.neatVal[0];
		cPara = currentUserProfile.para;
		cSmoker = currentUserProfile.checkSmoker === 'Yes' ? 0 : 1;
		cSex = currentUserProfile.sex === 'Male' ? 0 : 1;
		cFilled = true;
	}

	const [ name, setName ] = useState(cName);
	const [ email, setEmail ] = useState(cEmail);
	const [ major, setMajor ] = useState(cMajor);
	const [ selectedIndex, setSelectedIndex ] = useState(cSelectedIndex);
	const screenWidth = Dimensions.get('window').width;
	const screenHeight = Dimensions.get('window').height;
	const displayValue = academicYears[selectedIndex.row];
	const [ bedtimeVal, setbedtimeVal ] = useState(cBedtimeVal);
	const [ videogameVal, setvideogameVal ] = useState(cVideogameVal);
	const [ academicVal, setacademicVal ] = useState(cAcademicVal);
	const [ socialVal, setsocialVal ] = useState(cSocialVal);
	const [ peopleVal, setpeopleVal ] = useState(cPeopleVal);
	const [ borrowVal, setborrowVal ] = useState(cBorrowVal);
	const [ noiseVal, setnoiseVal ] = useState(cNoiseVal);
	const [ neatVal, setneatVal ] = useState(cNeatVal);
	const [ checkSmoker, setCheckSmoker ] = useState(cSmoker);
	const [ checkSex, setCheckSex ] = useState(cSex);
	const [ para, setPara ] = useState(cPara);
	const today = new Date();
	const time = today.getTime();
	const [ filledSex, setFilledSex ] = useState(cFilled);
	const [ filledSmoker, setFilledSmoker ] = useState(cFilled);
	let currentAlias = currentUser.substr(0, currentUser.indexOf('@'));

	const changeAcademicYearSelection = (selectedIndex) => {
		console.log('selectedIndex');
		console.log(selectedIndex);
		setSelectedIndex(selectedIndex);
	};

	const validate = () => {
		console.log(filledSex);
		console.log(filledSmoker);
		if (name === '' || email === '' || major === '' || filledSex == false || filledSmoker == false) {
			return false;
		} else {
			return true;
		}
	};

	return (
		<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
			<Layout style={styles.container} level={'1'}>
				{/* <Button accessoryCenter={ExitIcon} style={{color: 'white', borderColor: 'white', position: 'absolute', top:'7%', left: '70%' }} onPress={() => navigation.navigate('Home')}> </Button>  */}
				<SafeAreaView>
					<View contentContainerStyle={{ flex: 1, height: screenHeight }}>
						<View style={{ flexDirection: 'row' }}>
							<Button
								style={{ marginLeft: 0.03 * screenWidth }}
								status="basic"
								onPress={() => navigation.navigate('Buffer')}
							>
								{' '}
								Back{' '}
							</Button>
							<Button
								style={{ marginLeft: 0.6 * screenWidth }}
								size="small"
								accessoryLeft={trashIcon}
								status="basic"
								onPress={() => {
									Alert.alert(
										'Confirm Deletion',
										'Are you sure you want to delete your roommate profile?',
										[
											{
												text: 'Cancel',
												onPress: () => console.log('Cancel Pressed'),
												style: 'cancel'
											},
											{
												text: 'Delete',
												onPress: () => {
													Firebase.database()
														.ref('/Roommate Profile/' + currentAlias + '/')
														.remove();
													navigation.navigate('RoommateHome', {});
												}
											}
										],
										{ cancelable: false }
									);
								}}
							/>
						</View>
						<ScrollView
							contentContainerStyle={{
								flexGrow: 1,
								width: screenWidth,
								alignItems: 'center'
							}}
						>
							<Text
								style={{
									marginTop: 30,
									marginBottom: 20,
									fontSize: 36,
									marginHorizontal: 2
								}}
							>
								{' '}
								{'Roommate Profile'}{' '}
							</Text>
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'space-between',
									marginBottom: 10,
									marginTop: 10
								}}
							>
								<Text style={{ marginTop: 5 }}>{'Name: '} </Text>
								<Input
									style={{ flex: 0.9 }}
									size="medium"
									placeholder="Name"
									value={name}
									onChangeText={(name) => setName(name)}
								/>
							</View>
							<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
								<Text style={{ marginTop: 5 }}>{'Email:  '} </Text>
								<Input
									style={{ flex: 0.9 }}
									size="medium"
									placeholder="Email"
									value={email}
									onChangeText={(email) => setEmail(email)}
								/>
							</View>
							<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
								<Text style={{ marginTop: 5 }}>{'Year:     '}</Text>
								<Select
									placeholder="Default"
									selectedIndex={selectedIndex}
									value={displayValue}
									style={{ flex: 0.9 }}
									onSelect={changeAcademicYearSelection}
								>
									<SelectItem title="Freshman" />
									<SelectItem title="Sophomore" />
									<SelectItem title="Junior" />
									<SelectItem title="Senior" />
								</Select>
							</View>
							<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
								<Text style={{ marginTop: 5 }}>{'Major:   '}</Text>
								<Input
									style={{ flex: 0.9 }}
									size="medium"
									placeholder="Major"
									value={major}
									onChangeText={(major) => setMajor(major)}
								/>
							</View>
							<View
								style={{
									marginBottom: 10,
									flexDirection: 'row',
									justifyContent: 'flex-start',
									alignItems: 'flex-start'
								}}
							>
								<Text style={{ marginTop: 5, marginRight: 10 }}>{'Sex:'}</Text>
								<RadioGroup
									style={{
										flexDirection: 'row',
										justifyContent: 'flex-start',
										alignItems: 'flex-start'
									}}
									selectedIndex={checkSex}
									onChange={(index) => {
										setCheckSex(index);
										setFilledSex(true);
									}}
								>
									<Radio>Male</Radio>
									<Radio>Female</Radio>
								</RadioGroup>
							</View>
							<View style={{ marginBottom: 10, flexDirection: 'row', justifyContent: 'flex-start' }}>
								<Text style={{ marginTop: 5, marginRight: 10 }}>{'Are you a smoker?'}</Text>
								<RadioGroup
									style={{ flexDirection: 'row' }}
									selectedIndex={checkSmoker}
									onChange={(index) => {
										setCheckSmoker(index);
										setFilledSmoker(true);
									}}
								>
									<Radio>Yes</Radio>
									<Radio>No</Radio>
								</RadioGroup>
							</View>
							<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }} />
							<View style={{ marginBottom: 10, alignItems: 'center' }}>
								<Text style={{ marginTop: 5 }}>{'How early do you go to bed?'}</Text>
								<Text style={{ marginTop: 5 }}>{questions[0][bedtimeVal]}</Text>
								<Slider
									style={{ width: 200, height: 40 }}
									minimumValue={0}
									maximumValue={4}
									step={1}
									value={bedtimeVal}
									onValueChange={(bedtimeVal) => setbedtimeVal(bedtimeVal)}
									minimumTrackTintColor="#000000"
									maximumTrackTintColor="#000000"
								/>
							</View>
							<View style={{ marginBottom: 10, alignItems: 'center' }}>
								<Text style={{ marginTop: 5 }}>
									{'How much time a day do you spend on \n\t\t\t\tvideogames?'}
								</Text>
								<Text style={{ marginTop: 5 }}>{questions[1][videogameVal]}</Text>
								<Slider
									style={{ width: 200, height: 40 }}
									minimumValue={0}
									maximumValue={4}
									step={1}
									value={videogameVal}
									onValueChange={(videogameVal) => setvideogameVal(videogameVal)}
									minimumTrackTintColor="#000000"
									maximumTrackTintColor="#000000"
								/>
							</View>
							<View style={{ marginBottom: 10, alignItems: 'center' }}>
								<Text style={{ marginTop: 5 }}>{'How academically inclined are you?'}</Text>
								<Text style={{ marginTop: 5 }}>{questions[2][academicVal]}</Text>
								<Slider
									style={{ width: 200, height: 40 }}
									minimumValue={0}
									maximumValue={4}
									step={1}
									value={academicVal}
									onValueChange={(academicVal) => setacademicVal(academicVal)}
									minimumTrackTintColor="#000000"
									maximumTrackTintColor="#000000"
								/>
							</View>
							<View style={{ marginBottom: 10, alignItems: 'center' }}>
								<Text style={{ marginTop: 5 }}>{'How socially inclined are you?'}</Text>
								<Text style={{ marginTop: 5 }}>{questions[3][socialVal]}</Text>
								<Slider
									style={{ width: 200, height: 40 }}
									minimumValue={0}
									maximumValue={4}
									step={1}
									value={socialVal}
									onValueChange={(socialVal) => setsocialVal(socialVal)}
									minimumTrackTintColor="#000000"
									maximumTrackTintColor="#000000"
								/>
							</View>
							<View style={{ marginBottom: 10, alignItems: 'center' }}>
								<Text style={{ marginTop: 5 }}>{'How often will you bring people over?'}</Text>
								<Text style={{ marginTop: 5 }}>{questions[4][peopleVal]}</Text>
								<Slider
									style={{ width: 200, height: 40 }}
									minimumValue={0}
									maximumValue={4}
									step={1}
									value={peopleVal}
									onValueChange={(peopleVal) => setpeopleVal(peopleVal)}
									minimumTrackTintColor="#000000"
									maximumTrackTintColor="#000000"
								/>
							</View>
							<View style={{ marginBottom: 10, alignItems: 'center' }}>
								<Text style={{ marginTop: 5 }}>
									{'How often will you need to borrow items \n\t\t\tfrom your roommate?'}
								</Text>
								<Text style={{ marginTop: 5 }}>{questions[4][borrowVal]}</Text>
								<Slider
									style={{ width: 200, height: 40 }}
									minimumValue={0}
									maximumValue={4}
									step={1}
									value={borrowVal}
									onValueChange={(borrowVal) => setborrowVal(borrowVal)}
									minimumTrackTintColor="#000000"
									maximumTrackTintColor="#000000"
								/>
							</View>
							<View style={{ marginBottom: 10, alignItems: 'center' }}>
								<Text style={{ marginTop: 5 }}>{'What is your noise tolerance level?'}</Text>
								<Text style={{ marginTop: 5 }}>{questions[5][noiseVal]}</Text>
								<Slider
									style={{ width: 200, height: 40 }}
									minimumValue={0}
									maximumValue={4}
									step={1}
									value={noiseVal}
									onValueChange={(noiseVal) => setnoiseVal(noiseVal)}
									minimumTrackTintColor="#000000"
									maximumTrackTintColor="#000000"
								/>
							</View>
							<View style={{ marginBottom: 10, alignItems: 'center' }}>
								<Text style={{ marginTop: 5 }}>{'How neat are you?'}</Text>
								<Text style={{ marginTop: 5 }}>{questions[6][neatVal]}</Text>
								<Slider
									style={{ width: 200, height: 40 }}
									minimumValue={0}
									maximumValue={4}
									step={1}
									value={neatVal}
									onValueChange={(neatVal) => setneatVal(neatVal)}
									minimumTrackTintColor="#000000"
									maximumTrackTintColor="#000000"
								/>
							</View>
							<View style={{ marginTop: 10, marginBottom: 10 }}>
								<Text style={{ marginBottom: 10 }}> Tell us about yourself.</Text>
								<Input
									multiline={true}
									textStyle={{ minHeight: 256, maxHeight: 256 }}
									style={{ width: '90%', paddingTop: 5 }}
									placeholder="Enter text here..."
									value={para}
									onChangeText={(para) => setPara(para)}
								/>
							</View>
							<Button
								appearance="outline"
								style={{ marginBottom: 20 }}
								onPress={() => {
									if (validate() == true) {
										navigation.navigate('AssignPriority', {
											currentUser: currentUser,
											currentUserProfile: currentUserProfile,
											name: name,
											email: email,
											year: academicYears[selectedIndex.row],
											major: major,
											sex: checkSex === 0 ? 'Male' : 'Female',
											isSmoker: checkSmoker === 0 ? 'Yes' : 'No',
											bedtimeVal: bedtimeVal,
											videogameVal: videogameVal,
											academicVal: academicVal,
											socialVal: socialVal,
											peopleVal: peopleVal,
											borrowVal: borrowVal,
											noiseVal: noiseVal,
											neatVal: neatVal,
											para: para,
											key: key
										});
									} else {
										Alert.alert('Please fill in all fields.');
									}
								}}
							>
								Next
							</Button>
						</ScrollView>
					</View>
				</SafeAreaView>
			</Layout>
		</KeyboardAvoidingView>
	);
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	inputBox: {
		width: '90%',
		margin: 0,
		padding: 15,
		fontSize: 16,
		textAlign: 'center'
	}
});
