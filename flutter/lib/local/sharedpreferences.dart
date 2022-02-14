import 'package:graduation_project/models/employer_model.dart';
import 'package:shared_preferences/shared_preferences.dart';

late SharedPreferences preferences;

Future<void> sharedPreferences() async {
  preferences = await SharedPreferences.getInstance();
}

//save user token
Future<bool> saveUserToken(String userToken) =>
    preferences.setString('userToken', userToken);
Future<bool> removeUserToken() => preferences.remove('userToken');
String? getUserToken() => preferences.getString('userToken');

//save user id
Future<bool> saveUserId(String userid) =>
    preferences.setString('userId', userid);
Future<bool> removeUserId() => preferences.remove('userId');
String? getUserId() => preferences.getString('userId');

//save user expiry date
Future<bool> saveUserExpiryDate(String expiryDate) =>
    preferences.setString('userExpiryDate', expiryDate);
Future<bool> removeUserExpiryDate() => preferences.remove('userExpiryDate');
String? getUserExpiryDate() => preferences.getString('userExpiryDate');
