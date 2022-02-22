import 'dart:convert';
import 'dart:io';
import 'dart:typed_data';
import 'package:country_pickers/country.dart';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:flutter_webrtc/flutter_webrtc.dart';
import 'package:graduation_project/models/candidate.dart';
import 'package:graduation_project/models/positionCandidate.dart';
import 'package:graduation_project/providers/candidate_provider.dart';
import 'package:provider/provider.dart';
import '../models/interview_model.dart';
import '../providers/interview_provider.dart';
import 'package:country_pickers/country_pickers.dart';
import 'package:path/path.dart';
import 'dart:async';
import 'package:path_provider/path_provider.dart';
import 'package:csv/csv.dart';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
//import 'package:universal_io/io.dart';

//import 'dart:html';

class InvitationForm extends StatefulWidget {
  // final String fullName;
  // final String email;
  // final String phoneNumber;
  // final String positionName;
  final String positionId;

  InvitationForm(this.positionId);

  @override
  State<InvitationForm> createState() => _InvitationFormState();
}

class _InvitationFormState extends State<InvitationForm> {
  late List<List<dynamic>> employeeData;

  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();
  bool flag = false;
  List<PlatformFile>? _paths;
  String? _extension = "csv";
  FileType _pickingType = FileType.custom;

  Map<String, dynamic> candidate = {
    'name': '',
    'email': '',
    'phoneCode': '',
    'phoneNumber': ''
  };
  // var candidate = Candidate(
  //   name: '',
  //   email: '',
  //   phoneNumber: '',
  //   phoneCode: '',
  //   id: DateTime.now().toString(),

  // date: DateTime.now(),
  // rate: 0,
  // videoAnswers: [],
  // isRated: false,
  // positionName: ''
  // );
  var posCandidate = PositionCandidiate(positionId: '', candidatesMapList: {});
  @override
  void initState() {
    posCandidate = PositionCandidiate(
        positionId: widget.positionId, candidatesMapList: {});
    // TODO: implement initState
    super.initState();
    employeeData = List<List<dynamic>>.empty(growable: true);
  }

  openFile(filepath, context, bool flag2) async {
    File f = new File(filepath);
    print("CSV to List");
    final input = f.openRead();
    final fields = await input
        .transform(utf8.decoder)
        .transform(new CsvToListConverter())
        .toList();
    print(fields);
    setState(() {
      employeeData = fields;
      employeeData.forEach((element) {
        element.removeWhere((element2) => element2 == '');
        //list2 = filter(' ', element);
      });
    });
    _saveForms(context, flag2);
  }

  void _openFileExplorer(context, bool flag2) async {
    try {
      _paths = (await FilePicker.platform.pickFiles(
        type: _pickingType,
        allowMultiple: false,
        allowedExtensions: (_extension?.isNotEmpty ?? false)
            ? _extension?.replaceAll(' ', '').split(',')
            : null,
      ))
          ?.files;
    } on PlatformException catch (e) {
      print("Unsupported operation" + e.toString());
    } catch (ex) {
      print(ex);
    }
    if (!mounted) return;
    setState(() {
      openFile(_paths![0].path, context, flag2);
      print(_paths);
      print("File path ${_paths![0]}");
      print(_paths!.first.extension);
    });

    @override
    Widget build(BuildContext context) {
      // TODO: implement build
      throw UnimplementedError();
    }
  }

  final _form = GlobalKey<FormState>();

  //bool flag = true;

  void _saveForms(context, bool flag1) {
    var valid = _form.currentState!.validate();
    if (flag1 == false) {
      print('1111111111111');
      if (!valid) {
        return;
      }
      _form.currentState!.save();
      posCandidate = PositionCandidiate(
          positionId: posCandidate.positionId, candidatesMapList: candidate);
      Provider.of<Candidates>(context, listen: false).addAplicant(posCandidate);
    } else {
      // if (!valid) {
      //   return;
      // }

      // var candidate = Candidate(
      //   name: '',
      //   email: '',
      //   phoneNumber: '',
      //   phoneCode: '',
      //   id: DateTime.now().toString(),

      // date: DateTime.now(),
      // rate: 0,
      // videoAnswers: [],
      // isRated: false,
      // positionName: ''
      //);

      print('2222222222222');
      // for (int i = 0; i < employeeData.length; i++) {
      //   employeeData.forEach((element) {
      //     //list2 = filter(' ', element);
      //     element.removeWhere((element) => element == ' ');
      //   });
      // }

      print(employeeData);
      employeeData.forEach((element) {
        // candidate = Candidate(
        //   name: element[0].toString(),
        //   email: element[1].toString(),
        //   phoneNumber: element[3].toString(),
        //   //  date: candidate.date,
        //   phoneCode: element[2].toString(),
        //   id: candidate.id,
        // );
        // element.forEach((element2) {
        //   //list2 = filter(' ', element);
        //   print(element2);
        // });

        // element.removeWhere((element) => element == ' ');
        // name for name in starring if name.strip()
        candidate = {
          'name': element[0].toString(),
          'email': element[1].toString(),
          'phoneCode': '+ ${element[2].toString()}',
          'phoneNumber': element[3].toString(),
        };

        // rate: candidate.rate,
        // videoAnswers: candidate.videoAnswers,
        // isRated: candidate.isRated,
        // positionName: candidate.positionName

        // candidate = Interview(
        //     name: candidate.name,
        //     email: element[1].toString(),
        //     phone: candidate.phone,
        //     phoneCode: candidate.phoneCode,
        //     date: candidate.date,
        //     id: candidate.id,
        //     rate: candidate.rate,
        //     videoAnswers: candidate.videoAnswers,
        //     isRated: candidate.isRated,
        //     positionName: candidate.positionName);
        // candidate = Interview(
        //     name: candidate.name,
        //     email: candidate.email,
        //     phone: candidate.phone,
        //     phoneCode: element[2].toString(),
        //     date: candidate.date,
        //     id: candidate.id,
        //     rate: candidate.rate,
        //     videoAnswers: candidate.videoAnswers,
        //     isRated: candidate.isRated,
        //     positionName: candidate.positionName);
        // candidate = Interview(
        //     name: candidate.name,
        //     email: candidate.email,
        //     phone: element[3].toString(),
        //     phoneCode: candidate.phoneCode,
        //     date: candidate.date,
        //     id: candidate.id,
        //     rate: candidate.rate,
        //     videoAnswers: candidate.videoAnswers,
        //     isRated: candidate.isRated,
        //     positionName: candidate.positionName);
        var posCandidate = PositionCandidiate(
            positionId: widget.positionId, candidatesMapList: candidate);
        Provider.of<Candidates>(context, listen: false)
            .addAplicant(posCandidate);
        // print(candidate.name);
      });
      // _form.currentState!.save();
      // Provider.of<Interviews>(context, listen: false).addAplicant(candidate);

    }
    //print(employeeData);
    // print(ques.titleQuestion);
    // print(ques.answerTime);
  }

  @override
  Widget build(BuildContext context) {
    return Container(
        child: SingleChildScrollView(
      padding: EdgeInsets.only(
          top: 10,
          right: 10,
          left: 10,
          bottom: MediaQuery.of(context).viewInsets.bottom + 10),
      child: Column(
        children: <Widget>[
          Form(
              key: _form,
              child: Column(
                children: <Widget>[
                  TextFormField(
                    decoration: InputDecoration(labelText: 'Full-Name'),
                    textInputAction: TextInputAction.next,
                    onSaved: (value) {
                      candidate['name'] = value.toString();

                      // date: candidate.date,
                      //s  };
                      print(candidate['name']);
                      // id: candidate.id,
                      // rate: candidate.rate,
                      // videoAnswers: candidate.videoAnswers,
                      // isRated: candidate.isRated,
                      // positionName: candidate.positionName
                      //);
                    },
                    validator: (value) {
                      if (value!.isEmpty) {
                        return 'Please write the full-name';
                      }
                      return null;
                    },
                  ),
                  TextFormField(
                    decoration: InputDecoration(labelText: 'email'),
                    textInputAction: TextInputAction.next,
                    onSaved: (value) {
                      // candidate = Candidate(
                      //   name: candidate.name,
                      //   email: value.toString(),
                      //   phoneNumber: candidate.phoneNumber,
                      //   phoneCode: candidate.phoneCode,
                      //   // date: candidate.date,
                      //   id: candidate.id,
                      //   // rate: candidate.rate,
                      //   // videoAnswers: candidate.videoAnswers,
                      //   // isRated: candidate.isRated,
                      //   // positionName: candidate.positionName
                      // );
                      candidate['email'] = value.toString();

                      // date: candidate.date,
                      //   };
                      print(candidate['email']);
                    },
                    validator: (value) {
                      if (value!.isEmpty) {
                        return 'Please write the email';
                      }
                      return null;
                    },
                  ),
                  // Row(
                  // children: <Widget>[
                  SizedBox(
                    height: 10,
                  ),
                  Container(
                    alignment: Alignment.centerLeft,
                    child: Text(
                      'Country code ',
                      style: TextStyle(fontSize: 16.5, color: Colors.grey[600]),
                    ),
                  ),
                  Container(
                    alignment: Alignment.centerLeft,
                    child: CountryPickerDropdown(
                      initialValue: 'EG',
                      onValuePicked: (Country country) {
                        // candidate = Candidate(
                        //   name: candidate.name,
                        //   email: candidate.email,
                        //   phoneNumber: candidate.phoneNumber,
                        //   phoneCode: '+' + value.phoneCode.toString(),
                        //   // date: candidate.date,
                        //   id: candidate.id,
                        //   // rate: candidate.rate,
                        //   // videoAnswers: candidate.videoAnswers,
                        //   // isRated: candidate.isRated,
                        //   // positionName: candidate.positionName
                        // );
                        candidate['phoneCode'] = '+' + country.phoneCode;
                        // candidate = {
                        //   'name': candidate['name'],
                        //   'email': candidate['email'],
                        //   'phoneCode': ' + ${value.phoneCode.toString()}',

                        // date: candidate.date,
                        // };
                      },
                    ),
                  ),

                  TextFormField(
                    decoration: InputDecoration(labelText: 'Phone number '),
                    textInputAction: TextInputAction.done,
                    onSaved: (value) {
                      // candidate = Candidate(
                      //   name: candidate.name,
                      //   email: candidate.email,
                      //   phoneNumber: value.toString(),
                      //   phoneCode: candidate.phoneCode,
                      //   // date: candidate.date,
                      //   id: candidate.id,
                      //   // rate: candidate.rate,
                      //   // videoAnswers: candidate.videoAnswers,
                      //   // isRated: candidate.isRated,
                      //   // positionName: candidate.positionName
                      // );
                      candidate['phoneNumber'] = value.toString();
                      print(candidate['phoneNumber']);
                    },
                    validator: (value) {
                      if (value!.isEmpty) {
                        return 'Please write the phone number';
                      }
                      return null;
                    },
                  ),
                  //r    ],
                  // ),
                ],
              )),
          const SizedBox(
            height: 10,
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              RaisedButton(
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(30),
                ),
                color: Theme.of(context).primaryColor,
                onPressed: () {
                  setState(() {
                    flag = false;
                  });
                  _saveForms(context, flag);
                  print(posCandidate.positionId);
                  print(posCandidate.candidatesMapList);
                  // print("my flag : ${flag}");
                },
                child: const Text(
                  'Invite Candidate',
                  style: const TextStyle(color: Colors.white),
                ),
              ),
              RaisedButton(
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(30),
                ),
                color: Theme.of(context).primaryColor,
                //
                onPressed: () {
                  setState(() {
                    flag = true;
                  });
                  print("my flag : ${flag}");
                  _openFileExplorer(context, flag);
                  // Navigator.of(context).pop();
                  //  pickFiles();
                },
                child: const Text(
                  'Import from file',
                  style: const TextStyle(color: Colors.white),
                ),
              )
            ],
          ),
        ],
      ),
    ));
  }
}
