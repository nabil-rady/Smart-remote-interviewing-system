// import 'package:flutter/material.dart';
// import 'package:graduation_project/providers/positions.dart';
// import 'package:graduation_project/widgets/dashboard_item.dart';
// import 'package:provider/provider.dart';
// import '../providers/interview_provider.dart';

// class DashboardScreen extends StatelessWidget {
//   static const routeName = '/dashboard';

//   @override
//   Widget build(BuildContext context) {
//     final noOfInterviews = Provider.of<Interviews>(context).items;
//     final positionData = Provider.of<Positions>(context).positionsItems;
//     return Scaffold(
//       appBar: AppBar(
//         title: Text('Dashboard'),
//       ),
//       body: ListView.builder(
//         itemBuilder: (ctx, i) => DashboardItem(
//           positionName: positionData[i].position,
//           expieryDate: positionData[i].expireyDate.toString(),
//         ),
//         itemCount: positionData.length,
//       ),
//     );
//   }
// }
