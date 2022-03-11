import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:test/models/notification_model.dart';
import '../local/sharedpreferences.dart';
import '../local/http_exception.dart';
import 'package:http/http.dart' as http;

class Notifications with ChangeNotifier {
  List<NotificationModel> _items = [];
  List<NotificationModel> get notifications {
    return [..._items];
  }

  Future<void> getNotidfications() async {
    final response = await http.get(
      Uri.parse('http://10.0.2.2:8001/user/notifications'),
      headers: <String, String>{
        'Content-Type': 'application/json',
        'Authorization': getUserToken().toString(),
      },
    );
    final responseData = json.decode(response.body);
    if (response.statusCode == 200) {
      final responseData = json.decode(response.body);
      final extractedData = responseData['notifications'] as List<dynamic>;
      final List<NotificationModel> _finalList = [];
      extractedData
          .map((notificationvalue) => _finalList.add(
                NotificationModel(
                  interviewId: notificationvalue["interviewId"],
                  notificationId: notificationvalue["notificationId"],
                  userId: notificationvalue["userId"],
                  read: notificationvalue["read"],
                  body: notificationvalue["body"],
                  title: notificationvalue["title"],
                ),
              ))
          .toList();
      _items = _finalList.reversed.toList();

      notifyListeners();
    } else {
      throw HttpException(responseData['message']);
    }
  }
}
