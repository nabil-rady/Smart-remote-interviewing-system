import 'package:flutter/material.dart';
import '../widgets/circle.dart';
import '../widgets/start_interview.dart';
import '../widgets/employer_auth.dart';

class CompanySignupScreen extends StatefulWidget {
  static const routeName = '/company_signup';
  @override
  _CompanySignupScreenState createState() => _CompanySignupScreenState();
}

class _CompanySignupScreenState extends State<CompanySignupScreen> {
  bool _isemployer = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const CirculeWidget(),
              if (!_isemployer) const StartIntrview(),
              if (_isemployer) EmployerAuth(),
            ],
          ),
        ),
        floatingActionButton: FloatingActionButton.extended(
          label: Text(_isemployer ? 'Take interview' : 'Register as employer'),
          onPressed: () {
            setState(() {
              if (_isemployer) {
                _isemployer = false;
                print(' employee');
              } else {
                _isemployer = true;
                print(' employer');
              }
            });
          },
          backgroundColor: Theme.of(context).primaryColor,
        ));
  }
}


// import 'package:flutter/material.dart';
// import 'package:smart_interviewer/widgets/app_drawer.dart';
// import 'package:smart_interviewer/widgets/circle.dart';
// import 'package:smart_interviewer/widgets/employer_auth.dart';
// import 'package:smart_interviewer/widgets/start_interview.dart';
// import 'package:smart_interviewer/widgets/top_buttons.dart';

// class CompanySignupScreen extends StatefulWidget {
//   static const routeName = '/company_signup';
//   @override
//   _CompanySignupScreenState createState() => _CompanySignupScreenState();
// }

// class _CompanySignupScreenState extends State<CompanySignupScreen> {
//   bool _isemployer = false;

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(
//         backgroundColor: Theme.of(context).primaryColor,
//         title: Text('Smart Interviewer'),
//       ),
//       //drawer: AppDrawer(),
//       body: SingleChildScrollView(
//         child: Column(
//           crossAxisAlignment: CrossAxisAlignment.start,
//           children: [
//             //   CirculeWidget(),
//             Padding(
//               padding: EdgeInsets.only(top: 20, left: 15, right: 15),
//               child: Row(
//                 crossAxisAlignment: CrossAxisAlignment.center,
//                 children: [
//                   Expanded(
//                     child: SizedBox(
//                       width: 200.0,
//                       height: 50.0,
//                       child: OutlineButton(
//                         onPressed: () {
//                           setState(() {
//                             _isemployer = true;
//                             print(' employer');
//                           });
//                         },
//                         shape: RoundedRectangleBorder(
//                           borderRadius: BorderRadius.horizontal(
//                             right: Radius.circular(0),
//                             left: Radius.circular(30),
//                           ),
//                         ),
//                         child: const Text(
//                           "As employer",
//                         ),
//                       ),
//                     ),
//                   ),
//                   Expanded(
//                     child: SizedBox(
//                       width: 200.0,
//                       height: 50.0,
//                       child: OutlineButton(
//                         shape: RoundedRectangleBorder(
//                           borderRadius: BorderRadius.horizontal(
//                             left: Radius.circular(0),
//                             right: Radius.circular(30),
//                           ),
//                         ),
//                         onPressed: () {
//                           setState(() {
//                             _isemployer = false;
//                             print(' employee');
//                           });
//                         },
//                         child: Text(
//                           'As employee',
//                         ),
//                       ),
//                     ),
//                   ),
//                   SizedBox(
//                     height: 10,
//                   ),
//                 ],
//               ),
//             ),
//             // TopButtons(_isemployer),
//             SizedBox(
//               height: 20,
//             ),
//             Divider(
//               color: Colors.grey,
//             ),
//             if (!_isemployer) StartIntrview(),
//             if (_isemployer) EmployerAuth(),
//           ],
//         ),
//       ),
//     );
//   }
// }
