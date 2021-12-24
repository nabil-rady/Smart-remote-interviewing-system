import 'dart:convert';
import 'dart:io';
import 'dart:typed_data';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/interview_model.dart';
import '../providers/interview_provider.dart';

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

  // InvitationForm(this.positionName);

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

  var candidate = Interview(
      name: '',
      email: '',
      phone: '',
      id: DateTime.now().toString(),
      date: DateTime.now(),
      rate: 0,
      videoAnswers: [],
      isRated: false,
      positionName: '');

  @override
  void initState() {
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
      Provider.of<Interviews>(context, listen: false).addAplicant(candidate);
    } else {
      // if (!valid) {
      //   return;
      // }

      var candidate = Interview(
          name: '',
          email: '',
          phone: '',
          id: DateTime.now().toString(),
          date: DateTime.now(),
          rate: 0,
          videoAnswers: [],
          isRated: false,
          positionName: '');
      print('2222222222222');
      employeeData.forEach((element) {
        candidate = Interview(
            name: element[0].toString(),
            email: candidate.email,
            phone: candidate.phone,
            date: candidate.date,
            id: candidate.id,
            rate: candidate.rate,
            videoAnswers: candidate.videoAnswers,
            isRated: candidate.isRated,
            positionName: candidate.positionName);
        candidate = Interview(
            name: candidate.name,
            email: element[2].toString(),
            phone: candidate.phone,
            date: candidate.date,
            id: candidate.id,
            rate: candidate.rate,
            videoAnswers: candidate.videoAnswers,
            isRated: candidate.isRated,
            positionName: candidate.positionName);
        candidate = Interview(
            name: candidate.name,
            email: candidate.email,
            phone: element[1].toString(),
            date: candidate.date,
            id: candidate.id,
            rate: candidate.rate,
            videoAnswers: candidate.videoAnswers,
            isRated: candidate.isRated,
            positionName: candidate.positionName);
        Provider.of<Interviews>(context, listen: false).addAplicant(candidate);
        print(candidate.name);
      });
      // _form.currentState!.save();
      // Provider.of<Interviews>(context, listen: false).addAplicant(candidate);

    }

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
                      candidate = Interview(
                          name: value.toString(),
                          email: candidate.email,
                          phone: candidate.phone,
                          date: candidate.date,
                          id: candidate.id,
                          rate: candidate.rate,
                          videoAnswers: candidate.videoAnswers,
                          isRated: candidate.isRated,
                          positionName: candidate.positionName);
                    },
                    validator: (value) {
                      if (value!.isEmpty) {
                        return 'Please write a full-name';
                      }
                      return null;
                    },
                  ),
                  TextFormField(
                    decoration: InputDecoration(labelText: 'email'),
                    textInputAction: TextInputAction.next,
                    onSaved: (value) {
                      candidate = Interview(
                          name: candidate.name,
                          email: value.toString(),
                          phone: candidate.phone,
                          date: candidate.date,
                          id: candidate.id,
                          rate: candidate.rate,
                          videoAnswers: candidate.videoAnswers,
                          isRated: candidate.isRated,
                          positionName: candidate.positionName);
                    },
                    validator: (value) {
                      if (value!.isEmpty) {
                        return 'Please write your email';
                      }
                      return null;
                    },
                  ),
                  TextFormField(
                    decoration: InputDecoration(labelText: 'Phone number '),
                    textInputAction: TextInputAction.done,
                    onSaved: (value) {
                      candidate = Interview(
                          name: candidate.name,
                          email: candidate.email,
                          phone: value.toString(),
                          date: candidate.date,
                          id: candidate.id,
                          rate: candidate.rate,
                          videoAnswers: candidate.videoAnswers,
                          isRated: candidate.isRated,
                          positionName: candidate.positionName);
                    },
                    validator: (value) {
                      if (value!.isEmpty) {
                        return 'Please write your phone number';
                      }
                      return null;
                    },
                  ),
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
                  print("my flag : ${flag}");
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
