import { View, Text, FlatList, TextInput, Button, ScrollView, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { io } from 'socket.io-client';
import { useEffect } from 'react';
import { useRef } from 'react';
import { db, executeSql, getDataForAsync } from '../../CommanFunctions/CommanFunction';

const Chat = ({ ReceuverId }) => {
  console.log('ReceuverId-----', ReceuverId);
  const [Btn, setBtn] = useState();
  const [Sqlmessages, setSqlmessages] = useState([]);
  const [Uniq, setUniq] = useState('');
  const socket = io('http://192.168.2.240:3001'); // Change this URL based on your server
  const [messageInput, setMessageInput] = useState('');

  const createTable = async() => {
    const result = await executeSql('CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, senderId INTEGER, receiverId INTEGER, text TEXT)',
    [])
      console.log('result',result?.rows.item());
  };
  const insertMessage = (senderId, receiverId, text) => {
    console.log('Executing SQL query with senderId:', senderId, 'receiverId:', receiverId, 'text:', text)
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO messages (senderId,receiverId ,text) VALUES (?, ? ,?)`,
        [senderId, receiverId, text],

        (_, resultSet) => {
          console.log('Message inserted:--------', resultSet);
        },
        (_, error) => {
          console.error('Error inserting message:-----insert', error);
        }
      );
    });
  };
  const getMessagesForReceiver = (receiverId, senderId) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM messages WHERE (senderId = ? AND receiverId = ?) OR (senderId = ? AND receiverId = ?)',
        [senderId, receiverId, receiverId, senderId],
        (_, resultSet) => {
          const loadedMessages = [];
          console.log('resultSet----', resultSet);
          for (let i = 0; i < resultSet.rows.length; i++) {
            const message = resultSet.rows.item(i);
            console.log('Retrieved message:----get--sql---data-----', message);
            loadedMessages.push(message);
          }
          console.log('All loaded messages:', loadedMessages);

          // Reverse the order to show the latest messages at the bottom
          setSqlmessages(loadedMessages);
        },
        (tx, error) => {
          console.error('Error retrieving messages:', error);
        }
      );
    });

  };
  const getAllMessages = async () => {
    try {
      const result = await executeSql('SELECT * FROM messages', []);

      // Process the result and return the messages
      const messages = [];
      for (let i = 0; i < result.rows.length; i++) {
        messages.push(result.rows.item(i));
      }
      console.log('messages all message--', messages);
      setSqlmessages(messages);
    } catch (error) {
      console.error('Error retrieving all messages:', error);
      return null;
    }
  };
  const loadMessages = async () => {
    let id = await getDataForAsync('LoginId');
    getAllMessages()
  };
  useEffect(() => {
    // Listen for incoming messages
    (async () => {
      let id = await getDataForAsync('LoginId')
      setUniq(id)
    })()
    loadMessages()
    socket.on('chat message', (msg) => {
      setSqlmessages((prevMessages) => [...prevMessages, msg]);
    });
    createTable()

    // Clean up event listeners on unmount
    return () => {
      socket.off('chat message');
    };
  }, []);

  console.log('setSqlmessages0------get----', Sqlmessages);
  const scrollViewRef = useRef();
  const sendMessage = () => {
    if (messageInput.trim() !== '') {
      const newMessage = {
        text: messageInput,
        senderId: Uniq,
        receiverId: ReceuverId,
      };
      Uniq != ReceuverId && insertMessageForSender(Uniq, ReceuverId, messageInput)
      Uniq == ReceuverId && insertMessageForReceiver(Uniq, ReceuverId, messageInput)
      socket.emit('chat message', newMessage);
      // loadMessages();
      setMessageInput('');

    }
  };
  const insertMessageForSender = (senderId, receiverId, text) => {
      const res=executeSql(
        'INSERT INTO messages (senderId, receiverId, text) VALUES (?, ?, ?)',
        [senderId, receiverId, text]
      )
      console.log('res insert-------++++',res);
  };
  const insertMessageForReceiver = (senderId, receiverId, text) => {
    const res=executeSql(
      'INSERT INTO messages (senderId, receiverId, text) VALUES (?, ?, ?)',
      [receiverId, senderId, text]
    )
    console.log('res insert',res);
  
  };
  console.log('UniqId----', Uniq);
  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  console.log('Sqlmessages---------', Sqlmessages);
  return (
    <>
      <View style={{ flex: 1 }}>
        <View style={{
          flex: 3,
        }}>
          <ScrollView
            ref={scrollViewRef}
            style={{
              padding: 10
            }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexDirection: 'column' }}
            onContentSizeChange={scrollToBottom}
          >
            {Sqlmessages?.map((msg, index) => (
              <View
                key={index}
                style={{
                  alignSelf: msg.senderId == Uniq ? 'flex-end' : 'flex-start',
                  backgroundColor: msg.senderId == Uniq ? 'blue' : 'green',
                  padding: 10,
                  margin: 5,
                  borderRadius: 10,
                  maxWidth: '70%',
                }}
              >
                <Text style={{ color: 'white' }}>{msg.text}</Text>
              </View>
            ))}
            <View style={{ height: 10 }} />
          </ScrollView>
        </View>

        <View style={{
          flex: 0.3,
          backgroundColor: 'pink',
          flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, justifyContent: 'space-between'
        }}>
          <TextInput

            style={{ width: '85%', borderColor: 'gray', borderWidth: 1, borderRadius: 6, padding: 5 }}
            value={messageInput}
            placeholder='Typeing.....'
            onChangeText={(text) => setMessageInput(text)}
          />
          <Button title="Send" onPress={sendMessage} style={{
            marginLeft: 10
          }} />

        </View>
      </View>
    </>

  )
}

export default Chat