import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:flutter/foundation.dart';

class Api {
  final http.Client client;

  Api({required this.client});

  Future<String> getCandidatesList() async {
    try {
      final response = await client.get(
        Uri.parse(
            'https://vividly-app.me/api/hr/job-listing/candidates/4ff3f21c-c0cd-49be-9652-fd7fbee67597'),
        headers: {
          //'Content-Type': 'application/json; charset=utf-8',
          'Authorization':
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlYWQ1NzIwYi00YzNmLTQ2NTctOTA2MC1kN2ZjNTk0MTQ5OGYiLCJpYXQiOjE2NTE5NTA1NzgsImV4cCI6MTY1MTk4NjU3OH0.p2i0QZqAhu3bvl5m1V9ZjKDzpCDCqIlSkOPQzELNxvs'
        },
      );

      if (response.statusCode == 200) {
        //final joke = json.decode(response.body);
        return response.body.toString();
      } else {
        return 'Something went wrong';
      }
    } catch (error) {
      return "da5alna fi el catch";
    }
  }
}
