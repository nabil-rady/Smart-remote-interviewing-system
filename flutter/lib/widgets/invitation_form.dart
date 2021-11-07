import 'dart:io';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/interview_model.dart';
import '../providers/interview_provider.dart';

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
  void readFileSync() {
    String contents = new File('./assets/user.json').readAsStringSync();
    print(contents);
  }

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

  void _saveForms() {
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
                  _saveForms();
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
                  FilePickerResult? result = await FilePicker.platform
                      .pickFiles(
                          type: FileType.custom,
                          allowedExtensions: ['.txt', '.xlsx']);

                  if (result != null) {
                    File file = File(result.files.single.path.toString());
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
