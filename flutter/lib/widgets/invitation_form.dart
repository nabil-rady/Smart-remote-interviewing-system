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
    return Padding(
      padding: EdgeInsets.all(10),
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
          RaisedButton(
            onPressed: () {
              _saveForms();
            },
            child: Text('Invite Candidate'),
          ),
          RaisedButton(
            onPressed: () {},
            child: Text('Import from file'),
          )
        ],
      ),
    );
  }
}
