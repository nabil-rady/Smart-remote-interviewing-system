import 'dart:async';

import 'package:flutter/material.dart';
import '../local/sharedpreferences.dart';
import 'package:provider/provider.dart';
import '../providers/positions.dart';

class PositionItem extends StatefulWidget {
  final String positionName;
  final String positionId;
  final DateTime exdate;

  PositionItem(this.positionName, this.positionId, this.exdate);

  @override
  State<PositionItem> createState() => _PositionItemState();
}

class _PositionItemState extends State<PositionItem> {
  bool isLoading = false;

  showAlertDialog(BuildContext context) {
    // set up the buttons
    Widget cancelButton = TextButton(
      child: Text("yes"),
      onPressed: () {
        setState(() {
          isLoading = true;
        });
        deleteListingFuture(context, widget.positionId);

        Navigator.of(context).pop();
        setState(() {
          isLoading = false;
        });
      },
    );
    Widget continueButton = TextButton(
      child: Text("No"),
      onPressed: () {
        Navigator.of(context).pop();
      },
    );

    // set up the AlertDialog
    AlertDialog alert = AlertDialog(
      title: Text("Alert !"),
      content: Text("Are you sure you want to delete this position ?"),
      actions: [
        cancelButton,
        continueButton,
      ],
    );

    // show the dialog
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return alert;
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    late Future detailsFuture;
    return Padding(
      padding: const EdgeInsets.only(top: 8, right: 8, left: 8),
      child: ConnectionState.waiting == true
          ? Center(child: CircularProgressIndicator(color: Color(0xFF165DC0)))
          : InkWell(
              onTap: () {
                detailsFuture = getPositionDetails(context, widget.positionId);
                Navigator.of(context).pushNamed('/after_positions_screen',
                    arguments: [
                      widget.positionName,
                      widget.positionId,
                      detailsFuture,
                      widget.exdate
                    ]);
              },
              child: Card(
                child: Row(
                  children: <Widget>[
                    Expanded(
                      child: Container(
                        constraints: const BoxConstraints(
                          maxHeight: double.infinity,
                        ),
                        child: Padding(
                          child: Text(widget.positionName),
                          padding:
                              const EdgeInsets.only(bottom: 5, top: 5, left: 8),
                        ),
                      ),
                    ),
                    IconButton(
                      onPressed: () {
                        showAlertDialog(context);
                        // deleteListingFuture(context, positionId);
                        // Provider.of<Positions>(context, listen: false)
                        //     .removePosition(positionId);
                      },
                      icon: const Icon(Icons.delete),
                      color: Colors.red,
                    )
                  ],
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                ),
              ),
            ),
    );
  }
}
