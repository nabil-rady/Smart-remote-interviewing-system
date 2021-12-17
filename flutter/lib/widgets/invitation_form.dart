import 'dart:io';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/interview_model.dart';
import '../providers/interview_provider.dart';
import 'package:excel/excel.dart';
import 'package:path/path.dart';
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

  Future<String> get _localPath async {
    final directory = await getApplicationDocumentsDirectory();

    return directory.path;
  }

  Future<File> get _localFile async {
    final path = await _localPath;
    return File('$path/counter.txt');
  }

  Future<int> readExcelFile() async {
    try {
      final file = await _localFile;

      // Read the file
      final contents = await file.readAsString();

      return int.parse(contents);
    } catch (e) {
      // If encountering an error, return 0
      return 0;
    }
  }

  // void readFileSync() {
  //   String contents = new File('./assets/user.json').readAsStringSync();
  //   print(contents);
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
                onPressed: () async {
                  readExcelFile();

                  FilePickerResult? result = await FilePicker.platform
                      .pickFiles(
                          type: FileType.custom, allowedExtensions: ['.xlsx']);

                  if (result != null) {
                    File file = File(result.files.single.path.toString());

                    //using mobile need to be tested
                    // var uploadfile = result.files.single.bytes;
                    // String filename = basename(result.files.single.name);

                    // File file = File(filename);

                    // File file = File(result.files.single.path.toString());

                    late final bytes = file.readAsBytesSync();
                    late final excel = Excel.decodeBytes(bytes);

                    for (var table in excel.tables.keys) {
                      print(table); //sheet Name
                      print(excel.tables[table]!.maxCols);
                      print(excel.tables[table]!.maxRows);
                      for (var row in excel.tables[table]!.rows) {
                        print("$row");
                      }
                    }
                  } else {
                    //make a dialogue here to say that he must import a file or add participants manually
                    // User canceled the picker
                  }
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
