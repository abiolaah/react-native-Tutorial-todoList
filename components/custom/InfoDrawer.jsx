import React,{useState} from 'react';
import { View, Modal, TouchableOpacity, Switch, Text, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const InfoDrawer = ({styles,isDrawerVisible, setDrawerVisible}) => {
    const [isDateEnabled, setIsDateEnabled] = useState(true)
    const [isTimeEnabled, setIsTimeEnabled] = useState(false)
    const [date, setDate] = useState(new Date())
    const [time, setTime] = useState(new Date())
    const [isDatePickerVisible, setDatePickerVisible] = useState(false)
    const [isTimePickerVisible, setTimePickerVisible] = useState(false)

    const dateToggleSwitch = () => {
        setIsDateEnabled(previousState => !previousState)
        if (isDateEnabled === false) {
          setDatePickerVisible(false)
        }
        setDatePickerVisible(previousState => !previousState)
    }
    const timeToggleSwitch = () => {
        setIsTimeEnabled(previousState => !previousState)
        setTimePickerVisible(previousState => !previousState)
    }
    
      // function to change date
    const onDateChange = (event, selectedDate) => {
        setDate(selectedDate)
    }
    
      // function to change time
    const onTimeChange = (event, selectedTime) => {
        setTime(selectedTime)
    }
    return (
        <Modal
        animationType='slide'
        transparent={true}
        visible={isDrawerVisible}
        onRequestClose={() => setDrawerVisible(false)}
      >
        <View style={styles.drawerBackdrop}>
          <View style={styles.drawerContainer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10
              }}
            >
              <Pressable
                style={styles.drawerCloseButton}
                onPress={() => setDrawerVisible(false)}
              >
                <Text style={styles.drawerCloseButtonText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={styles.drawerCloseButton}
                onPress={() => setDrawerVisible(false)}
              >
                <Text style={styles.drawerCloseButtonText}>Done</Text>
              </Pressable>
            </View>
  
            {/* Date: Add date picker */}
            <TouchableOpacity
              onPress={() => {
                setDatePickerVisible(true)
              }}
              style={styles.dateTimeButton}
            >
              <View style={styles.dateSwitchView}>
                <View style={styles.dateView}>
                  <Text style={styles.dateText}>Date</Text>
                  <Text style={styles.dateValueText}>
                    {isDatePickerVisible && isDateEnabled
                      ? date.toLocaleDateString()
                      : 'Today'}
                  </Text>
                </View>
  
                {/* Switch */}
                <Switch
                  trackColor={{ false: '#767577', true: '#1cd396' }}
                  thumbColor={isDateEnabled ? '#f2f5f4' : '#f4f3f4'}
                  ios_backgroundColor='#3e3e3e'
                  onValueChange={dateToggleSwitch}
                  value={isDateEnabled}
                />
              </View>
  
              {isDatePickerVisible && (
                <DateTimePicker
                  value={date}
                  mode='date'
                  onChange={onDateChange}
                  style={{ width: '100%' }}
                />
              )}
            </TouchableOpacity>
  
            {/* Time: Add time picker */}
            <TouchableOpacity style={styles.dateTimeButton}>
              <View style={styles.dateSwitchView}>
                <View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    margin: 10
                  }}
                >
                  <Text style={styles.timeText}>Time</Text>
                  <Text style={styles.timeValueText}>
                    {isTimePickerVisible && isTimeEnabled
                      ? time.toLocaleTimeString()
                      : ''}
                  </Text>
                </View>
  
                <Switch
                  trackColor={{ false: '#767577', true: '#1cd396' }}
                  thumbColor={isTimeEnabled ? '#f2f5f4' : '#f4f3f4'}
                  ios_backgroundColor='#3e3e3e'
                  onValueChange={timeToggleSwitch}
                  value={isTimeEnabled}
                />
              </View>
              {isTimePickerVisible && (
                <View style={{ width: '100%' }}>
                  <DateTimePicker
                    value={time}
                    mode='time'
                    is24Hour={true}
                    onChange={onTimeChange}
                  />
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
}

export default InfoDrawer;