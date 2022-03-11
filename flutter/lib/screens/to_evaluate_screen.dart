import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../widgets/applicant_card.dart';
import '../providers/position_details_provider.dart';
import '../widgets/helper_widget.dart';

class ToEvaluateScreen extends StatefulWidget {
  final Future detailsFuture;
  const ToEvaluateScreen({Key? key, required this.detailsFuture})
      : super(key: key);

  static const routeName = '/to_evaluate_screen';

  @override
  State<ToEvaluateScreen> createState() => _ToEvaluateScreenState();
}

class _ToEvaluateScreenState extends State<ToEvaluateScreen> {
  late Future _detailsFuture;
  @override
  void initState() {
    _detailsFuture = widget.detailsFuture;
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('To Evaluate'),
        backgroundColor: Theme.of(context).primaryColor,
      ),
      body: FutureBuilder(
        future: _detailsFuture,
        builder: (ctx, dataSnapshot) {
          if (dataSnapshot.connectionState == ConnectionState.waiting) {
            return const Center(
                child: CircularProgressIndicator(color: Color(0xFF165DC0)));
          } else {
            if (dataSnapshot.error != null) {
              // ...
              // Do error handling stuff
              String error = dataSnapshot.error.toString();
              print(error);
              if (error.contains('The json web token has expired')) {
                return TokenExpiry();
              }
              return const Center(
                child: Text('An error occurred!'),
              );
            } else {
              return Consumer<PostionDetails>(
                builder: (ctx, position, child) => position
                        .cacandidates.isNotEmpty
                    ? ListView.builder(
                        itemCount: position.cacandidates.length,
                        itemBuilder: (ctx, index) {
                          return ApplicantCard(position.cacandidates[index]);
                        },
                      )
                    : const Center(
                        child: Text(
                        "No Applicants To Evaluate Yet, Please Invite More People ",
                        textAlign: TextAlign.center,
                      )),
              );
            }
          }
        },
      ),
    );
  }
}
