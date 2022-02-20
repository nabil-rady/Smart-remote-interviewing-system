import 'package:graduation_project/models/employer_model.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:camera/camera.dart';

late SharedPreferences preferences;
late CameraController cameraConroller;

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

void saveCameraController(CameraController cam) {
  cameraConroller = cam;
}

CameraController getCameraController() {
  return cameraConroller;
}
