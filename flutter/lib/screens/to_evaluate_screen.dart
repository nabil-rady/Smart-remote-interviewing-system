import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/interview_provider.dart';
import '../widgets/drawer.dart';
import '../widgets/applicant_card.dart';

class ToEvaluateScreen extends StatelessWidget {
  static const routeName = '/to_evaluate_screen';

  @override
  Widget build(BuildContext context) {
    final applicants = Provider.of<Interviews>(context).items;
    return Scaffold(
      appBar: AppBar(
        title: Text('To Evaluate'),
        backgroundColor: Theme.of(context).primaryColor,
      ),
      drawer: AppDrawer(),
      body: ListView.builder(
        itemCount: applicants.length,
        itemBuilder: (ctx, index) {
          return ApplicantCard(applicants[index].id, applicants[index].name,
              applicants[index].date);
        },
      ),
    );
  }
}
