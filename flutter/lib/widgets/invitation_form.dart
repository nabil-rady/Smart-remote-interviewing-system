import 'dart:io';
import 'dart:typed_data';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/interview_model.dart';
import '../providers/interview_provider.dart';
import 'package:excel/excel.dart';
import 'package:path/path.dart';
import 'package:file_picker_cross/file_picker_cross.dart';
import 'dart:async';
import 'package:path_provider/path_provider.dart';
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
  var file = "";
  String fileName = '';
  String _path = '';
  String _extension = 'xlsx';
  FileType _pickingType = FileType.any;

  // void pickFiles() async {
  //   FilePickerResult? result = await FilePicker.platform
  //       .pickFiles(type: FileType.custom, allowedExtensions: ['xlsx', 'csv']);
  //   if (result == null) return;
  //   PlatformFile? file = result.files.first;
  //   Future<Uint8List> bytes = await File(file).readAsBytesSync();
  //   var excel = Excel.decodeBytes(bytes);

  //   for (var table in excel.tables.keys) {
  //     print(table); //sheet Name
  //     print(excel.tables[table]?.maxCols);
  //     print(excel.tables[table]?.maxRows);
  //     for (var row in excel.tables[table]!.rows) {
  //       print("$row");
  //     }
  //   }
  // }

  // void viewFile(PlatformFile file) {
  //   OpenFile.open(file.path);
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

  final _form = GlobalKey<FormState>();

  //bool flag = true;

  void _saveForms(context) {
    var valid = _form.currentState!.validate();
    if (!valid) {
      return;
    }
    _form.currentState!.save();
    Provider.of<Interviews>(context, listen: false).addAplicant(candidate);

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
                  _saveForms(context);
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
                  //  pickFiles();
                }
                // () async {
                //   FilePickerCross myFile =
                //       await FilePickerCross.importFromStorage(
                //           type: FileTypeCross
                //               .any, // Available: `any`, `audio`, `image`, `video`, `custom`. Note: not available using FDE
                //           fileExtension:
                //               'xlsx' // Only if FileTypeCross.custom . May be any file extension like `dot`, `ppt,pptx,odp`
                //           );
                //   print(myFile.toString());

                //   String? selectedDirectory =
                //       await FilePicker.platform.getDirectoryPath();

                //   if (selectedDirectory == null) {
                //     // User canceled the picker
                //   }
                //   String file = selectedDirectory.toString();
                //   var bytes = File(file).readAsBytesSync();
                //   var excel = Excel.decodeBytes(bytes);

                //   for (var table in excel.tables.keys) {
                //     print(table); //sheet Name
                //     print(excel.tables[table]?.maxCols);
                //     print(excel.tables[table]?.maxRows);
                //     for (var row in excel.tables[table]!.rows) {
                //       print("$row");
                //     }
                //   }
                ,
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
