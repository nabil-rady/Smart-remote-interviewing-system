// import 'package:flutter/material.dart';
// import '../providers/auth_provider.dart';
// import '../screens/home_screen.dart';
// import '../screens/waiting_screen.dart';
// import 'package:lottie/lottie.dart';
// import 'package:provider/provider.dart';

// import './main_screen.dart';

// class SplashScreen extends StatefulWidget {
//   static const routeName = '/splash_screen';
//   // const SplashScreen({Key key}) : super(key: key);

//   @override
//   _SplashScreenState createState() => _SplashScreenState();
// }

// class _SplashScreenState extends State<SplashScreen>
//     with TickerProviderStateMixin {
//   late AnimationController _controller;

//   @override
//   void initState() {
//     super.initState();
//     _controller = AnimationController(
//       duration: const Duration(seconds: (5)),
//       vsync: this,
//     );
//   }

//   @override
//   void dispose() {
//     // TODO: implement dispose
//     super.dispose();
//     _controller.dispose();
//   }

//   @override
//   Widget build(BuildContext context) {
//     final auth = Provider.of<Auth>(context);
//     return Scaffold(
//       body: Column(
//         children: [
//           Lottie.asset(
//             'assets/lottie/73810-business-idea-animation.json',
//             controller: _controller,
//             height: MediaQuery.of(context).size.height * 2.5 / 3,
//             animate: true,
//             onLoaded: (composition) {
//               _controller
//                 ..duration = composition.duration
//                 ..forward().whenComplete(() => Navigator.pushReplacement(
//                       context,
//                       MaterialPageRoute(
//                         builder: (context) => Provider.of<Auth>(context).isAuth
//                             ? HomeScreen()
//                             : FutureBuilder(
//                                 future: Provider.of<Auth>(context).autoLogin(),
//                                 builder: (ctx, authResultSnapshot) {
//                                   return authResultSnapshot.connectionState ==
//                                           ConnectionState.waiting
//                                       ? WaitingScreen()
//                                       : CompanySignupScreen();
//                                 }),
//                         //CompanySignupScreen(),
//                       ),
//                     ));
//             },
//           ),
//           Text(
//             "Vividly",
//             textAlign: TextAlign.center,
//             style: TextStyle(
//               color: Theme.of(context).primaryColor,
//               fontWeight: FontWeight.bold,
//               fontSize: 25.0,
//             ),
//           ),
//         ],
//       ),
//     );
//   }
// }
// الي شغاله
// import 'package:flutter/material.dart';
// import '../providers/auth_provider.dart';
// import '../screens/home_screen.dart';
// import '../screens/waiting_screen.dart';
// import 'package:lottie/lottie.dart';
// import 'package:provider/provider.dart';

// import './main_screen.dart';

// class SplashScreen extends StatefulWidget {
//   static const routeName = '/splash_screen';
//   // const SplashScreen({Key key}) : super(key: key);

//   @override
//   _SplashScreenState createState() => _SplashScreenState();
// }

// class _SplashScreenState extends State<SplashScreen>
//     with TickerProviderStateMixin {
//   late AnimationController _controller;

//   @override
//   void initState() {
//     super.initState();
//     _controller = AnimationController(
//       duration: const Duration(seconds: (5)),
//       vsync: this,
//     );
//   }

//   @override
//   void dispose() {
//     // TODO: implement dispose
//     super.dispose();
//     _controller.dispose();
//   }

//   @override
//   Widget build(BuildContext context) {
//     final auth = Provider.of<Auth>(context);
//     return Scaffold(
//       body: Column(
//         children: [
//           Lottie.asset(
//             'assets/lottie/73810-business-idea-animation.json',
//             controller: _controller,
//             height: MediaQuery.of(context).size.height * 2.5 / 3,
//             animate: true,
//             onLoaded: (composition) {
//               _controller
//                 ..duration = composition.duration
//                 ..forward().whenComplete(() => Navigator.push(
//                     context,
//                     MaterialPageRoute(
//                         builder: (context) => CompanySignupScreen())));
//             },
//           ),
//           Text(
//             "Vividly",
//             textAlign: TextAlign.center,
//             style: TextStyle(
//               color: Theme.of(context).primaryColor,
//               fontWeight: FontWeight.bold,
//               fontSize: 25.0,
//             ),
//           ),
//         ],
//       ),
//     );
//   }
// }

// ? HomeScreen()
//                             : FutureBuilder(
//                                 future: Provider.of<Auth>(context).autoLogin(),
//                                 builder: (ctx, authResultSnapshot) {
//                                   print(authResultSnapshot.data);
//                                   return authResultSnapshot.data == true
//                                       // authResultSnapshot.connectionState ==
//                                       //         ConnectionState.active
//                                       ? HomeScreen()
//                                       : CompanySignupScreen();
//
//                             }),

import 'dart:async';

import 'package:flutter/material.dart';
import 'package:graduation_project/local/sharedpreferences.dart';
import 'package:graduation_project/providers/auth_provider.dart';
import 'package:graduation_project/screens/home_screen.dart';
import 'package:graduation_project/screens/main_screen.dart';
import 'package:graduation_project/screens/waiting_screen.dart';
import 'package:page_transition/page_transition.dart';
import 'package:provider/provider.dart';

class SplashScreen extends StatefulWidget {
  SplashScreen({
    Key? key,
  }) : super(key: key);

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    navigator();
  }

  navigator() async {
    print('-------------------------');

    print(getUserToken());
    if (getUserToken() != null) {
      print('///////////////////////////////');
      Timer(const Duration(seconds: 3), () {
        print('Login');
        // FutureBuilder(
        //     future: trytologin(),
        //     //  initialData: InitialData,
        //     builder: (ctx, authSnapshot) =>
        //         authSnapshot.connectionState == ConnectionState.waiting
        //             ? WaitingScreen()
        //             : HomeScreen());
        Provider.of<Auth>(context, listen: false).autoLogin().then((value) =>
            Navigator.pushAndRemoveUntil(
                context,
                MaterialPageRoute(builder: (context) => HomeScreen()),
                (Route<dynamic> route) => false));
      });
      // navigateAndFinish(context, HomeScreen());
    } else {
      Timer(const Duration(seconds: 3), () {
        print('Login');
        Navigator.push(
          context,
          PageTransition(
            type: PageTransitionType.scale,
            duration: Duration(seconds: 3),
            alignment: Alignment.topCenter,
            child: CompanySignupScreen(),
          ),
        );
        //navigateAndFinish(context, LoginScreen());
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Hero(
        tag: 'assets/images/1.png',
        child: Center(
          child: Image.asset('assets/images/2.png'),
        ),
      ),
    );
  }
}
