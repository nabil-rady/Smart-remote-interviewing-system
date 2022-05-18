import 'package:http/http.dart' as http;
import 'package:dio/dio.dart';

abstract class NetworkService {
  Future<http.Response> get(String url, {Map<String, String> headers});
  Future<dynamic> post(String url, dynamic body);
}

class NetworkServiceImpli implements NetworkService {
  final dio = Dio();
  final authToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmYjQ3NjY5NC0xZjVmLTQ3YmEtYjBmNy02YmVjZjg2MDBjODciLCJpYXQiOjE2NTI4MTgwNTYsImV4cCI6MTY4NDM3NTY1Nn0.TAgIpfcjM5YQJ2cfSrRfHtQsWULYfaDMARijz6ZCRew';
  @override
  Future<http.Response> get(String url, {Map<String, String>? headers}) async {
    final response = await http.get(
      Uri.parse(url),
      headers: <String, String>{
        'Content-Type': 'application/json',
        'Authorization': authToken.toString(),
      },
    );
    print(response);
    //if (response.statusCode != 200) throw Exception('ERROR');
    return response;
  }

  @override
  Future<dynamic> post(String url, dynamic body) async {
    final response = await dio.get(url);
    return response.data;
  }
}
