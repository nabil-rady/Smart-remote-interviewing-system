import 'dart:convert';
import 'dart:io';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:country_pickers/country_pickers.dart';
import 'dart:async';
import 'package:csv/csv.dart';
import 'package:flutter/services.dart';

import '../models/positionCandidate.dart';
import '../providers/candidate_provider.dart';

class InvitationForm extends StatefulWidget {
  final String positionId;

  InvitationForm(this.positionId);

  @override
  State<InvitationForm> createState() => InvitationFormState();
}

class InvitationFormState extends State<InvitationForm> {
  late List<List<dynamic>> employeeData;

  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();
  bool flag = false;
  bool csvFlag = false;
  bool isLoading1 = false;
  bool isLoading2 = false;
  List<PlatformFile>? _paths;
  String? _extension = "csv";
  FileType _pickingType = FileType.custom;
  TextEditingController mynameController = TextEditingController();
  TextEditingController myemailController = TextEditingController();
  TextEditingController mynumberController = TextEditingController();

  clearTextInput() {
    mynameController.clear();
    myemailController.clear();
    mynumberController.clear();
  }

  Map<String, dynamic> candidate = {
    'name': '',
    'email': '',
    'phoneCode': '+20',
    'phoneNumber': ''
  };

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
    final input = f.openRead();
    final fields = await input
        .transform(utf8.decoder)
        .transform(new CsvToListConverter())
        .toList();
    setState(() {
      employeeData = fields;
      employeeData.forEach((element) {
        element.removeWhere((element2) => element2 == '');
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

  Future<void> _saveForms(context, bool flag1) async {
    var valid = _form.currentState!.validate();
    if (flag1 == false) {
      if (!valid) {
        return;
      }
      _form.currentState!.save();

      // try {
      posCandidate = PositionCandidiate(
          positionId: posCandidate.positionId, candidatesMapList: candidate);
      await Provider.of<Candidates>(context, listen: false)
          .addAplicant(posCandidate, context);
      setState(() {
        isLoading1 = false;
      });
      // .then((value) {}
      //showErrorDialog(
      //  context, "Invitaion has been successfully sent .", false
      //)
      //    );
      // } on HttpException catch (error) {
      //   print('HTTP ERRORRRR');
      //   print('${error} JGJFFHFGHGHHH');
      //   if (error.toString().contains('Validation failed')) {
      //     showErrorDialog(context,
      //         'Please check the phone number of your candidate !', true);
      //   }
      // } catch (error) {
      //   print('CATCH ERRORRRR');
      //   print('${error} JGJFFHFGHGHHH');
      //   showErrorDialog(context, "Coundn't invite this candidite.", true);
      // }
    } else {
      // try {
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
      // setState(() {
      //   csvFlag = true;
      // });
      // Provider.of<Candidates>(context, listen: false).csvCandidateList =
      //     employeeData;
      var posCandidate = PositionCandidiate(
          positionId: widget.positionId, candidatesMapList: candidate);
      await Provider.of<Candidates>(context, listen: false)
          .addAplicantList(employeeData, posCandidate, context);
      setState(() {
        isLoading2 = false;
        csvFlag = false;
      });
      // if (response) {
      //   showErrorDialog(
      //       context, "Invitaions have been sent successfully.", false);
      // }

      // for (int i = 0; i < employeeData.length; i++) {
      //   employeeData.forEach((element) {
      //     //list2 = filter(' ', element);
      //     element.removeWhere((element) => element == ' ');
      //   });
      // }

      // print(employeeData);
      // employeeData.forEach((element) {
      //   // candidate = Candidate(
      //   //   name: element[0].toString(),
      //   //   email: element[1].toString(),
      //   //   phoneNumber: element[3].toString(),
      //   //   //  date: candidate.date,
      //   //   phoneCode: element[2].toString(),
      //   //   id: candidate.id,
      //   // );
      //   // element.forEach((element2) {
      //   //   //list2 = filter(' ', element);
      //   //   print(element2);
      //   // });

      //   // element.removeWhere((element) => element == ' ');
      //   // name for name in starring if name.strip()
      //   candidate = {
      //     'name': element[0].toString(),
      //     'email': element[1].toString(),
      //     'phoneCode': '+ ${element[2].toString()}',
      //     'phoneNumber': element[3].toString(),
      //   };

      //   // rate: candidate.rate,
      //   // videoAnswers: candidate.videoAnswers,
      //   // isRated: candidate.isRated,
      //   // positionName: candidate.positionName

      //   // candidate = Interview(
      //   //     name: candidate.name,
      //   //     email: element[1].toString(),
      //   //     phone: candidate.phone,
      //   //     phoneCode: candidate.phoneCode,
      //   //     date: candidate.date,
      //   //     id: candidate.id,
      //   //     rate: candidate.rate,
      //   //     videoAnswers: candidate.videoAnswers,
      //   //     isRated: candidate.isRated,
      //   //     positionName: candidate.positionName);
      //   // candidate = Interview(
      //   //     name: candidate.name,
      //   //     email: candidate.email,
      //   //     phone: candidate.phone,
      //   //     phoneCode: element[2].toString(),
      //   //     date: candidate.date,
      //   //     id: candidate.id,
      //   //     rate: candidate.rate,
      //   //     videoAnswers: candidate.videoAnswers,
      //   //     isRated: candidate.isRated,
      //   //     positionName: candidate.positionName);
      //   // candidate = Interview(
      //   //     name: candidate.name,
      //   //     email: candidate.email,
      //   //     phone: element[3].toString(),
      //   //     phoneCode: candidate.phoneCode,
      //   //     date: candidate.date,
      //   //     id: candidate.id,
      //   //     rate: candidate.rate,
      //   //     videoAnswers: candidate.videoAnswers,
      //   //     isRated: candidate.isRated,
      //   //     positionName: candidate.positionName);
      //   var posCandidate = PositionCandidiate(
      //       positionId: widget.positionId, candidatesMapList: candidate);
      //   Provider.of<Candidates>(context, listen: false)
      //       .addAplicant(posCandidate, true);
      //   // print(candidate.name);
      // });
      //   Navigator.of(context).pop();
      // _form.currentState!.save();
      // Provider.of<Interviews>(context, listen: false).addAplicant(candidate);

      // } on HttpException catch (error) {
      //   print(error.toString());
      //   // if (error.toString() == ('Validation failed.')) {
      //   print('hiiiiiiiiiii');
      //   showErrorDialog(context,
      //       'Please check the phone number of your candidates !', true);
      //   //  }
      // } catch (e) {
      //   showErrorDialog(context, "Coundn't invite these candidites.", true);
      // }
    }
    //print(employeeData);
    // print(ques.titleQuestion);
    // print(ques.answerTime);
  }

  ////////// test
  validateNameField(String value) {
    if (value.isEmpty) {
      if (csvFlag) {
        // setState(() {
        //   csvFlag = false;
        //   print(csvFlag);
        // });
        return null;
      }
      setState(() {
        isLoading1 = false;
      });
      return 'Please write the name';
    }
    return null;
  }

  validateEmailField(String value) {
    if (value.isEmpty) {
      if (csvFlag) {
        // setState(() {
        //   csvFlag = false;
        // });
        print('monica2');
        return null;
      }
      setState(() {
        isLoading1 = false;
      });
      return 'Please write the email';
    }
    return null;
  }

  validatePhoneField(String value) {
    if (value.isEmpty) {
      if (csvFlag) {
        return null;
      }
      setState(() {
        isLoading1 = false;
      });
      return 'Please write the phone number';
    }
    return null;
  }

//////////////////
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
        mainAxisSize: MainAxisSize.min,
        children: <Widget>[
          Form(
              key: _form,
              child: Column(
                children: <Widget>[
                  TextFormField(
                      decoration: InputDecoration(labelText: 'Full-Name'),
                      controller: mynameController,
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
                      validator: (value) => validateNameField(value!)
                      // {
                      //   if (value!.isEmpty) {
                      //     if (csvFlag) {
                      //       // setState(() {
                      //       //   csvFlag = false;
                      //       //   print(csvFlag);
                      //       // });
                      //       print('monica1');
                      //       return null;
                      //     }
                      //     setState(() {
                      //       isLoading1 = false;
                      //     });
                      //     print('Zikoo1');
                      //     return 'Please write the name';
                      //   }
                      //   return null;
                      // },
                      ),
                  TextFormField(
                      controller: myemailController,
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
                      validator: (value) => validateNameField(value!)
                      // {
                      //   if (value!.isEmpty) {
                      //     if (csvFlag) {
                      //       // setState(() {
                      //       //   csvFlag = false;
                      //       // });
                      //       print('monica2');
                      //       return null;
                      //     }
                      //     setState(() {
                      //       isLoading1 = false;
                      //     });
                      //     return 'Please write the email';
                      //   }
                      //   return null;
                      // },
                      ),
                  // Row(
                  // children: <Widget>[
                  const SizedBox(
                    height: 10,
                  ),
                  Container(
                    alignment: Alignment.centerLeft,
                    child: Text(
                      'Country code ',
                      style: TextStyle(fontSize: 16.5, color: Colors.grey[600]),
                    ),
                  ),
                  Row(
                      //  mainAxisAlignment: MainAxisAlignment.end,
                      children: <Widget>[
                        Expanded(
                          // alignment: Alignment.centerLeft,
                          child: CountryPickerDropdown(
                            initialValue: 'EG',
                            onValuePicked: (value) {
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
                              // print(country);
                              if (value.toString() == "") {
                                candidate['phoneCode'] = '+20';
                              } else {
                                candidate['phoneCode'] = '+' + value.phoneCode;
                              }

                              // candidate = {
                              //   'name': candidate['name'],
                              //   'email': candidate['email'],
                              //   'phoneCode': ' + ${value.phoneCode.toString()}',

                              // date: candidate.date,
                              // };
                            },
                          ),
                        ),
                        Expanded(
                          child: TextFormField(
                              decoration: const InputDecoration(
                                  labelText: 'Phone number '),
                              textInputAction: TextInputAction.done,
                              controller: mynumberController,
                              onSaved: (value) {
                                candidate['phoneNumber'] = value.toString();
                              },
                              validator: (value) => validatePhoneField(value!)
                              //  {
                              //   if (value!.isEmpty) {
                              //     if (csvFlag) {
                              //       return null;
                              //     }
                              //     setState(() {
                              //       isLoading1 = false;
                              //     });
                              //     return 'Please write the phone number';
                              //   }
                              //   return null;
                              // },
                              ),
                        ),
                      ]),
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
                    isLoading1 = true;
                  });
                  _saveForms(context, flag);
                  clearTextInput();
                },
                child: isLoading1
                    ? Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: const [
                          SizedBox(
                            height: 13,
                            width: 12,
                            child: CircularProgressIndicator(
                              color: Colors.white,
                            ),
                          ),
                          SizedBox(
                            width: 5,
                          ),
                          Text(
                            'Please wait..',
                            style: TextStyle(color: Colors.white),
                          )
                        ],
                      )
                    : const Text(
                        'Invite Candidate',
                        style: TextStyle(color: Colors.white),
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
                    csvFlag = true;
                    isLoading2 = true;
                  });
                  _openFileExplorer(context, flag);
                },
                child: isLoading2
                    ? Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: const [
                          SizedBox(
                            height: 13,
                            width: 12,
                            child: CircularProgressIndicator(
                              color: Colors.white,
                            ),
                          ),
                          SizedBox(
                            width: 5,
                          ),
                          Text(
                            'Please wait..',
                            style: TextStyle(color: Colors.white),
                          )
                        ],
                      )
                    : const Text(
                        'Import from file',
                        style: TextStyle(color: Colors.white),
                      ),
              )
            ],
          ),
        ],
      ),
    ));
  }
}
